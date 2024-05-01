// AddUserForm.tsx
import React from 'react';
import { Form, Input, Button, InputNumber, Modal } from 'antd';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './AddUser.scss'
interface AddUserDTO {
    firstName: string;
    lastName: string;
    age: number;
}

const AddUserForm: React.FC = () => {
    const navigate = useNavigate();
    const { handleSubmit, control } = useForm<AddUserDTO>();
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        // Thực hiện logic thêm người dùng ở đây
        console.log('Adding user...');
        setIsModalVisible(false);
        // Sau khi thêm xong, điều hướng đến trang hiển thị danh sách người dùng
        navigate('/services');
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const onSubmit = () => {
        showModal(); // Hiển thị modal xác nhận khi người dùng ấn nút "Add User"
    };

    return (
        <>

            <Form onFinish={handleSubmit(onSubmit)} className='AddForm'>
                <Button type='primary' style={{ width: '100px', backgroundColor: 'revert-layer', color: 'white', float: 'right', marginTop: '-100px', marginRight: '50px' }} onClick={() => navigate('/services')}>Quay Lại</Button>

                <Form.Item label="Tên" name="firstName" rules={[{ required: true, message: 'Please enter first name' }]}>
                    <Input style={{ width: '250px' }} />
                </Form.Item>

                <Form.Item label="Họ" name="lastName" rules={[{ required: true, message: 'Please enter last name' }]}>
                    <Input style={{ width: '250px' }} />
                </Form.Item>

                <Form.Item label="Tuổi" name="age" rules={[{ required: true, message: 'Please enter age' }]}>
                    <InputNumber style={{ marginLeft: '40px', width: '250px' }} />
                </Form.Item>
                <Form.Item label="Chức Vụ" name="position" rules={[{ required: true, message: 'Please enter last name' }]}>
                    <Input style={{ width: '250px' }} />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" style={{ marginLeft: '120px', marginTop: '20px' }}>
                        Thêm Nhân Viên
                    </Button>
                </Form.Item>
            </Form>
            <Modal
                title="Confirm Add User"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <p>Are you sure you want to add this user?</p>
            </Modal>
        </>

    );
};

export default AddUserForm;
