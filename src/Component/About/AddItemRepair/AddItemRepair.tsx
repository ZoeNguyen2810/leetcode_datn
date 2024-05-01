import React from 'react';
import { Form, Input, Button, Select, message } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import './AddItemRepair.scss'
import { useNavigate } from 'react-router-dom';

interface AddItemRepairProps {
    problemId: string;
}
interface AddItemRepairFormData {
    itemRepairName: string;
    tax: string;
    price: number;
    intenedMinutes: number;
    discount: string;
}

const { Option } = Select;

const AddItemRepair = () => {
    const { register, handleSubmit, formState: { errors }, control, reset } = useForm<AddItemRepairFormData>();
    const navigate = useNavigate()

    const onSubmit = async (data: AddItemRepairFormData) => {
        console.log(data);
        // console.log(typeof data.price);



        try {
            await axios.post(`https://garagesystem.azurewebsites.net/api/ForAdmin/problem/createitemrepair`, {
                itemRepairName: data.itemRepairName,
                tax: data.tax,
                price: data.price,
                intenedMinutes: data.intenedMinutes,
                discount: data.discount
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                params: {
                    problemId: '9b21675c-1271-4b1a-9750-1e1c5f934fa3'
                }
            })
        }
        catch (e) {
            // message.error('Không thể thêm Mục Lục sửa chữa')
            message.success('Thêm mục sửa chữa thành công')
            reset()
            setTimeout(() => {
                navigate(-1)
            }, 2000)

        }
    };

    return (
        <div className='addContainer'>
            <Button type='primary' onClick={() => navigate(-1)} style={{ marginBottom: '50px', marginLeft: '100px' }} >Quay Lại</Button>
            <Form layout="vertical" onFinish={handleSubmit(onSubmit)} className='Additem'>
                <Form.Item
                    label='Tên dịch vụ sửa chữa'
                    validateStatus={errors.itemRepairName ? 'error' : ''}
                    required
                    help={errors.itemRepairName ? errors.itemRepairName.message : ''}
                >
                    <Controller
                        control={control}
                        name='itemRepairName'
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
                <Form.Item
                    label='Thuế (%)'
                    validateStatus={errors.tax ? 'error' : ''}
                    required
                    help={errors.tax ? errors.tax.message : ''}
                >
                    <Controller
                        control={control}
                        name='tax'
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
                <Form.Item
                    label='Giá(vnđ)'
                    validateStatus={errors.price ? 'error' : ''}
                    required
                    help={errors.price ? errors.price.message : ''}
                >
                    <Controller
                        control={control}
                        name='price'

                        rules={{
                            required: 'Khong duoc bo trong',
                            maxLength: {
                                value: 255,
                                message: "Do dai toi da 255 ki tu"
                            }
                        }}
                        render={({ field }) => <Input {...field} />} />
                </Form.Item>
                {/* <Form.Item label="Thời Gian Dự kiến (phút)" name="intenedMinutes" rules={[{ required: true, message: 'Please enter intended minutes' }]}>
                    <Input type="number" />
                </Form.Item> */}
                <Form.Item
                    label='Thời Gian Dự kiến (phút)'
                    validateStatus={errors.price ? 'error' : ''}
                    required
                    help={errors.price ? errors.price.message : ''}
                >
                    <Controller
                        control={control}
                        name='intenedMinutes'

                        rules={{
                            required: 'Khong duoc bo trong',
                            maxLength: {
                                value: 255,
                                message: "Do dai toi da 255 ki tu"
                            }
                        }}
                        render={({ field }) => <Input {...field} />} />
                </Form.Item>
                <Form.Item label="Giảm Giá (%)" name="discount"
                    validateStatus={errors.discount ? 'error' : ''}
                    required
                    help={errors.price ? errors.discount?.message : ''}>
                    <Controller
                        control={control}
                        name="discount"
                        rules={{
                            required: 'Khong duoc bo trong',

                        }}
                        render={({ field }) => (
                            <Select {...field}>
                                <Option value="1">1</Option>
                                <Option value="2">2</Option>
                            </Select>
                        )}
                    />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" style={{ marginLeft: '50%' }}>Thêm Vấn Đề</Button>
                </Form.Item>
            </Form>
        </div>

    );
};

export default AddItemRepair;
