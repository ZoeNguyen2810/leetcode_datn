import React, { useState } from 'react';
import { Button, List, Typography, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import FrameTimeDTO from '../../../DTO/FrameTime';
import { useGlobalContext } from '../../../GlobalContext/GlobalContext';

export const ShowFrameTime: React.FC = () => {
    const navigate = useNavigate();
    const { selectedDate } = useGlobalContext();
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('en-CA'); // Adjust the locale as needed
    const copyFrameID = (frameId: string | undefined) => {

        if (frameId) {
            navigator.clipboard.writeText(frameId);
            message.success('Lấy thông tin thành công')
        }

    };
    console.log(formattedDate);
    console.log('Frame Time Data:', typeof selectedDate);

    const [frameTime, setFrameTime] = useState<FrameTimeDTO[]>([]);
    const dateSelect = selectedDate || formattedDate;
    // Provide a default value when selectedDate is undefined
    console.log('date', dateSelect);

    const handleGetTime = async () => {
        console.log('Frame Time Data:', selectedDate);

        try {
            const response = await axios.get<FrameTimeDTO[]>('https://garagesystem.azurewebsites.net/api/Booking/timeframe/getall', {
                params: {
                    valueDate: dateSelect,
                }
            });
            setFrameTime(response.data);

            console.log('response', response.data);
            console.log('Frame Time Data:', selectedDate);
        } catch (error) {
            console.error('Error fetching frame time data:', error);
        }
    };

    return (
        <>
            <Button type='primary' style={{ marginRight: '20px' }} onClick={() => navigate('/frame-time/create')}>
                Thêm Khung Thời Gian
            </Button>
            <Button onClick={handleGetTime}>Hiển Thị Khung Thời Gian</Button>
            <div style={{ marginTop: '20px' }}>
                <div style={{ height: '550px', overflowY: 'auto' }}>
                    {frameTime.length === 0 && <div style={{
                        fontSize: '30px', color: 'red',
                        padding: '40px'
                    }}>No FrameTime</div>}
                    {frameTime.length > 0 && (
                        <List
                            dataSource={frameTime}
                            renderItem={(item: FrameTimeDTO) => (
                                <List.Item style={{
                                    border: '1px solid #ccc',
                                    padding: '10px',
                                    margin: '10px',
                                    borderRadius: '5px',
                                    boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)',
                                    background: '#fff',
                                    color: '#333'
                                }}>
                                    {/* Your rendering logic for individual item goes here */}
                                    <div style={{ alignItems: 'center' }}>
                                        <h2 style={{
                                            color: '#1677ff', // Màu chữ xanh
                                            fontStyle: 'italic', // Font chữ nghiêng
                                            marginRight: '10px'
                                        }}>
                                            Khung Thời Gian
                                        </h2>

                                        <div style={{ marginLeft: '40px' }}>
                                            {/* <p>Frame ID: {item.frameId}</p> */}
                                            <Button type='primary' onClick={() => copyFrameID(item.frameId)}>Lấy Thông Tin</Button>
                                            {/* <p></p> */}
                                            <p>Bắt Đầu: {item.startAt}</p>
                                            <p>Kết Thúc: {item.endAt}</p>
                                            <p>Số Chỗ Hợp Lệ: {item.availableSlots}</p>
                                            <p>Số Chỗ tối đa: {item.maxSlots}</p>
                                        </div>
                                    </div>

                                </List.Item>

                            )}
                        />
                    )}
                </div>
            </div>
        </>
    );
};
