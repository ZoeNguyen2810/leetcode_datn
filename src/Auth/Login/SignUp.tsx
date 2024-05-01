import React from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import './SignUp.scss'
import { Form, Input, Button } from 'antd';
import axios from 'axios';

// Define type for form input
type FormInputs = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
};

const RegistrationForm: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        reset
    } = useForm<FormInputs>(); // Sử dụng type FormInputs ở đây

    const onSubmit: SubmitHandler<FormInputs> = (data) => {
        console.log(data);
        // Handle submitted data
        alert(data)
        reset()

    };

    return (
        <Form layout='vertical' onFinish={handleSubmit(onSubmit)} className='SignIn'>
            <Form.Item
                label='Tên'
                validateStatus={errors.firstName ? 'error' : ''}
                required
                help={errors.firstName ? errors.firstName.message : ''}
            >
                <Controller
                    name='firstName'
                    control={control}
                    defaultValue=''
                    rules={{
                        required: 'Vui long nhap firstName',
                        maxLength: {
                            value: 255,
                            message: "Do dai ten toi da 255 ki tu"
                        }
                    }}
                    render={({ field }) => <Input {...field} />}
                />
            </Form.Item>
            <Form.Item
                label='Họ'
                required
                validateStatus={errors.lastName ? 'error' : ''}
                help={errors.lastName ? errors.lastName.message : ''}
            >
                <Controller
                    name='lastName'
                    control={control}
                    defaultValue=''
                    rules={{
                        required: 'Vui long nhap lastName',
                        maxLength: {
                            value: 255,
                            message: "Khong duoc bo trong .Do dai ten toi da 255 ki tu"
                        }
                    }}
                    render={({ field }) => <Input {...field} />}
                />


            </Form.Item>
            <Form.Item
                name='email'
                label='email'
                required
                help={errors.email ? errors.email.message : ''}
                validateStatus={errors.email ? 'error' : ''}
            >
                <Controller
                    name='email'
                    control={control}
                    defaultValue=''
                    rules={{
                        required: 'Vui long email',
                        maxLength: {
                            value: 255,
                            message: "Do dai ten toi da 255 ki tu"
                        }
                    }}
                    render={({ field }) => <Input {...field} />}
                />
            </Form.Item>
            <Form.Item
                name='password'
                label='Mật Khẩu'
                validateStatus={errors.password ? 'error' : ''}
                help={errors.password ? errors.password.message : ''}
                required>
                <Controller
                    name='password'
                    control={control}
                    defaultValue=''
                    rules={{
                        required: 'Vui long nhap password',
                        maxLength: {
                            value: 255,
                            message: "Do dai ten toi da 255 ki tu"
                        }
                    }}

                    render={({ field }) => <Input {...field} />}
                />
            </Form.Item>
            <Button type='primary' htmlType='submit' style={{ marginLeft: '200px' }}>Đăng Kí</Button>
        </Form>
    );
};

export default RegistrationForm;
