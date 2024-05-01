import AddSymptomModal from "./Modal/AddSympton";

import './Blogs.scss'
import React, { useState, useEffect } from 'react';
import { Select, Button, List, Modal } from 'antd';
import axios from 'axios';
import CreateBooking from "./AddBooking/CreateBooking";

export interface Symptom {
    symptonId: string;
    name: string;
}

const Blogs = () => {
    const [options, setOptions] = useState<Symptom[]>([]);
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        handleCallAPI()
    }, []);

    const handleCallAPI = () => {
        axios.get<Symptom[]>('https://garagesystem.azurewebsites.net/api/Booking/sympton/getall')
            .then(response => {
                setOptions(response.data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const handleRefresh = () => {
        // Gọi lại API để tải lại danh sách các symptom
        handleCallAPI();
    };
    console.log('options', options);

    return (
        <div className="Booking-container">
            <div className="Symptom">
                <h4 style={{ color: '#1677ff' }}>Các Triệu Chứng Của Xe</h4>

                <Button type="primary" style={{ marginBottom: '20px', marginRight: '10px' }} onClick={showModal}>
                    Thêm Triệu Chứng
                </Button>
                <Button type="primary" style={{ marginBottom: '20px' }} onClick={handleRefresh}>
                    Làm Mới Trang
                </Button>
                <div style={{ height: '550px', overflowY: 'auto' }}>
                    <List
                        dataSource={options}
                        renderItem={(item: Symptom) => (
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
                                    <div style={{ marginLeft: '20px', color: '#1677ff', }}>
                                        <p style={{ fontSize: '15px' }}>Tên Triệu Chứng: {item.name}</p>
                                        {/* <p>Start At: {item.symptonId}</p> */}
                                    </div>
                                </div>
                            </List.Item>
                        )}
                    />
                </div>
                <AddSymptomModal visible={isModalVisible} onCancel={handleCancel} />
            </div>
            <div className="Booking">
                {/* <CreateBooking /> */}
                <CreateBooking options={options} />
            </div>
        </div>
    );
}

export default Blogs;
