import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { useForm } from 'react-hook-form';
import './ForgotPassword.scss'
import { useNavigate } from 'react-router-dom';
import { API_ENDPOINT } from '../../Constant/api';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface ForgotPasswordForm {
    email?: string;
}

const ForgotPassword: React.FC = () => {
    const { register, handleSubmit, formState: { errors }, } = useForm<ForgotPasswordForm>();
    const navigate = useNavigate()
    const onSubmit = async (data: ForgotPasswordForm) => {
        // Gửi yêu cầu quên mật khẩu tới server ở đây
        // Ví dụ:
        // authService.forgotPassword(data.email)
        console.log('data', data);

        try {

            const response = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}${API_ENDPOINT.FORGOT_PASSWORD}`, null, {
                params: {
                    email: data.email,
                }
            });

            // Kiểm tra response từ server
            if (response.status === 200) {
                message.success('Yêu cầu đã được gửi. Vui lòng kiểm tra email để đặt lại mật khẩu.');

            } else {
                message.error('Đã xảy ra lỗi. Vui lòng thử lại sau.');
            }
            navigate('/reset-password')

        } catch (error) {
            console.error('Error:', error);
            message.error('Đã xảy ra lỗi. Vui lòng thử lại sau.');
        }
    };


    return (
        <>
            <Form onFinish={handleSubmit(onSubmit)} layout="vertical" className='Forgot'>
                <div>
                    <label className='title'>Email</label>
                    <input className='inputLogin' {...register('email', { required: true })} />
                    {errors.email && <span>This field is required</span>}
                </div>
                <button type="submit" className='buttonLogin' style={{ marginLeft: '200px', marginBottom: '15px' }}

                >Gửi</button>
                <div>
                    <Link to='/login' style={{ marginLeft: '200px', marginTop: '40px' }}>Quay về trang Đăng nhập ?</Link>
                </div>
            </Form>
        </>

    );
};

export default ForgotPassword;
