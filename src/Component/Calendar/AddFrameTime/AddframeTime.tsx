import React from 'react';
import { Form, Button, DatePicker, InputNumber, Modal } from 'antd';
import { useForm } from 'react-hook-form';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_ENDPOINT } from '../../../Constant/api';
import { message, Space } from 'antd';


interface RegistrationDTO {
    valueDate?: string | null;
    startAt?: number;
    endAt?: number;
    availableSlots?: number;
    maxSlots?: number;
}

const FrameTimeForm = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    const { handleSubmit, setValue, control, reset } = useForm<RegistrationDTO>();
    const [isModalVisible, setIsModalVisible] = React.useState(false);

    const success = () => {
        messageApi.open({
            type: 'success',
            content: 'Create FrameTime successfully',
        });
    };
    const error = () => {
        messageApi.open({
            type: 'error',
            content: 'fail to add frameTime',
        });
    };

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        handleSubmit(onSubmit)();
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const handleBack = () => {
        navigate('/cards');
    }

    const onSubmit = async (data: RegistrationDTO) => {
        console.log(token);

        try {
            const res = await axios.post(`https://garagesystem.azurewebsites.net/api/Booking/timeframe/create`, {
                valueDate: data.valueDate,
                startAt: data.startAt,
                endAt: data.endAt,
                availableSlots: data.availableSlots,
                maxSlots: data.maxSlots
            }, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            // console.log('success', res);
            success()
            setTimeout(() => {
                handleBack()
            }, 2000)

        }
        catch (e) {
            error()
        }
        console.log('Submitted data:', data);
        reset()


    };

    return (
        <>
            {contextHolder}
            <Form onFinish={handleSubmit(showModal)} className='Frame-time' style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
                <Button type='primary' onClick={() => handleBack()} style={{ float: 'right', marginBottom: '40px', marginTop: '100px' }}>
                    Quay Lại
                </Button>

                <Form.Item label="Ngày" name="valueDate" rules={[{ required: true, message: 'Please select a date' }]} style={{ textAlign: 'right', marginRight: '15px', width: '250px', marginTop: '200px' }}>
                    <DatePicker
                        onChange={(date) => setValue('valueDate', date ? date.format('YYYY-MM-DD') : null, { shouldValidate: true })}
                        defaultValue={undefined}
                    />
                </Form.Item>

                <Form.Item label="Thời Gian Bắt Đầu" name="startAt" rules={[{ required: true, message: 'Please enter start time' }]}>
                    <InputNumber style={{ width: '250px' }} onChange={(value) => setValue('startAt', Number(value), { shouldValidate: true })} />
                </Form.Item>

                <Form.Item label="Thời Gian kết thúc" name="endAt" rules={[{ required: true, message: 'Please enter end time' }]}>
                    <InputNumber style={{ width: '250px' }} onChange={(value) => setValue('endAt', Number(value), { shouldValidate: true })} />
                </Form.Item>

                {/* <Form.Item label="Số Chỗ Hợp Lệ" name="availableSlots" rules={[{ required: true, message: 'Please enter available slots' }]}>
                    <InputNumber style={{ width: '250px' }} onChange={(value) => setValue('availableSlots', Number(value), { shouldValidate: true })} />
                </Form.Item> */}

                <Form.Item label="Số Chỗ tối đa" name="maxSlots" rules={[{ required: true, message: 'Please enter max slots' }]}>
                    <InputNumber style={{ width: '250px' }} onChange={(value) => setValue('maxSlots', Number(value), { shouldValidate: true })} />
                </Form.Item>

                <Form.Item>
                    <Button style={{ marginLeft: '100px', marginRight: '20px' }}
                        onClick={handleBack}
                    >Hủy</Button>
                    <Button type="primary" htmlType="submit" >
                        Đăng Kí Khung
                    </Button>
                </Form.Item>
            </Form>

            <Modal
                title="Xác nhận thêm mới"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <p>Bạn có chắc chắn muốn thêm mới?</p>
            </Modal>
        </>
    );
};

export default FrameTimeForm;
