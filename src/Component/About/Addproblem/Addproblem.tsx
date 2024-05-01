import React from 'react'
import './AddProblem.scss'
import axios from 'axios'
import { Button, Form, Input, message } from 'antd'
import { useNavigate } from 'react-router-dom'
import { SubmitHandler, useForm, Controller } from 'react-hook-form';

type AddProblem = {
    problemName?: string
}

export const Addproblem = () => {
    const { register, handleSubmit, formState: { errors }, control, reset } = useForm<AddProblem>()
    const navigate = useNavigate()
    const [messageApi, contextHolder] = message.useMessage();
    const token = localStorage.getItem('token')
    const success = () => {
        messageApi.open({
            type: 'success',
            content: 'Add problem thành công',
        });
    };
    const onSubmit: SubmitHandler<AddProblem> = async (data) => {
        console.log(data);
        try {
            await axios.post(`https://garagesystem.azurewebsites.net/api/ForAdmin/problem/createproblem`, null,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                    params: {
                        problemName: data.problemName
                    }
                }
            )
            message.success('add thanh cong')
            setTimeout(() => {
                navigate(-1)
            }, 2000)

        }
        catch (e) {
            console.log(e);
            message.error('Add that bai')
        }
        reset()

    }
    return (
        <div className='createContainer'>
            <Button type='primary' style={{ marginLeft: '100px', marginBottom: '100px' }} onClick={() => navigate(-1)}>Quay lại</Button>
            <Form layout='vertical' onFinish={handleSubmit(onSubmit)} className='formProblem' >
                <Form.Item
                    label='Tên Vấn Đề'
                    validateStatus={errors.problemName ? 'error' : ''}
                    required
                    help={errors.problemName ? errors.problemName.message : ''}
                >
                    <Controller
                        control={control}
                        name='problemName'
                        defaultValue=''
                        rules={{
                            required: 'Khong duoc bo trong',
                            maxLength: {
                                value: 255,
                                message: "Do dai toi da 255 ki tu"
                            }
                        }}
                        render={({ field }) => <Input {...field} />} />
                </Form.Item>
                <Button type='primary' htmlType='submit' style={{ marginTop: '30px', marginLeft: '40%' }}>Thêm Vấn Đề</Button>

            </Form>

        </div>
    )
}
