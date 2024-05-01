import React from 'react';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import './ResetPass.scss'
import { useNavigate } from 'react-router-dom';
import { Form, Button, Input } from 'antd';

type ResetPass = {
    password: string;
    confirmPassword: string

}

const ResetPasswordForm = () => {
    const { register, handleSubmit, formState: { errors }, getValues, control, reset } = useForm<ResetPass>();
    const navigate = useNavigate()


    const onSubmit: SubmitHandler<ResetPass> = (data) => {
        // Xử lý dữ liệu khi form được submit
        console.log(data);
        reset()
        navigate('/login')
    };

    return (
        <Form layout='vertical' onFinish={handleSubmit(onSubmit)} className='ChangePassword'>
            <Form.Item
                label='Mật Khẩu'
                validateStatus={errors.password ? 'error' : ''}
                required
                help={errors.password ? errors.password.message : ''}
            >
                <Controller
                    control={control}
                    name='password'
                    defaultValue=''
                    rules={{
                        required: 'Xin vui long nhap password',
                        maxLength: {
                            value: 10,
                            message: 'Do dai toi da 10 ki tu'
                        }
                    }}
                    render={({ field }) => <Input {...field} />}
                />
            </Form.Item>
            <Form.Item
                label='Xác Nhận Mật Khẩu'
                name='confirmPassword'
                validateStatus={errors.confirmPassword ? 'error' : ''}
                required
                help={errors.confirmPassword ? errors.confirmPassword.message : ''}

            >
                <Controller
                    name='confirmPassword'
                    control={control}
                    defaultValue=''
                    rules={{
                        validate: (value) =>
                            value === getValues('password') ? undefined : 'Mật khẩu không khớp',
                    }}
                    render={({ field }) => <Input {...field} />} />
            </Form.Item>
            <Button type='primary' htmlType='submit'>Đăng kí</Button>

        </Form>
    );
};

export default ResetPasswordForm;
