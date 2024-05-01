import React, { useState } from 'react';
import { Form, Input, Select, Button, message, DatePicker } from 'antd';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import { Symptom } from '../Blogs';
import { log } from 'console';

const { Option } = Select;

interface BookingDTO {
    carId: string;
    userId: string;
    frameId: string;
    symptonId: string[];
    createdTime: string;
}

interface CreateBookingProps {
    // onCreateSuccess: () => void;
    options: Symptom[]
}

const CreateBooking: React.FC<CreateBookingProps> = ({ options }) => {
    const { control, handleSubmit, formState: { errors }, reset } = useForm<BookingDTO>();
    const [loading, setLoading] = useState(false);
    console.log('options Props', options);
    const token = localStorage.getItem('token')

    const onSubmit: SubmitHandler<BookingDTO> = async (data) => {
        data.userId = '2345'
        data.carId = '1234'
        console.log('data', data)

        try {
            setLoading(true);
            await axios.post('https://garagesystem.azurewebsites.net/api/Booking/create', {
                carId: data.carId,
                userId: data.userId,
                frameId: data.frameId,
                symptonId: data.symptonId,
                createdTime: data.createdTime
            },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

            message.success('Booking created successfully');
            // onCreateSuccess(); // Thông báo parent component về sự thành công
            reset()
        } catch (error) {
            // console.error('Error creating booking:', error);
            reset()
            message.error('Failed to create booking');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form layout="vertical" onFinish={onSubmit} style={{ alignItems: 'center' }}>
            {/* <Form.Item label="Car ID" name="carId" rules={[{ required: true, message: 'Please enter Car ID' }]}>
                <Input style={{ width: '550px' }} />
            </Form.Item> */}

            <Form.Item label="Tên Người Dùng" name="userId" rules={[{ required: true, message: 'Please enter User ID' }]}>
                <Input style={{ width: '550px' }} />
            </Form.Item>

            <Form.Item label="Khung Thời Gian" name="frameId" rules={[{ required: true, message: 'Please enter Frame ID' }]}>
                <Input style={{ width: '550px' }} />
            </Form.Item>

            <Form.Item
                label="Tên Triệu Chứng"
                name="symptonId"  // <-- Corrected prop name
                rules={[{ required: true, message: 'Please select at least one Symptom ID' }]}
            >
                <Select mode="multiple" style={{ width: '550px' }}>
                    {/* Add more options as needed */}
                    {options.map((sympton) => (
                        <Option key={sympton.symptonId} value={sympton.symptonId}>
                            {sympton.name}
                        </Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item
                label="Thời Gian"
                name="createdTime"
                rules={[{ required: true, message: 'Please select Created Time' }]}
            >
                <DatePicker showTime format="YYYY-MM-DD" />
            </Form.Item>

            <Form.Item>
                <Button type="primary" loading={loading} htmlType="submit">
                    Tạo Booking
                </Button>
            </Form.Item>
        </Form>
    );
};

export default CreateBooking;
