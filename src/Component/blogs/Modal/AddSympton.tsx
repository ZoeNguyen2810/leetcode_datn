import React, { useState } from 'react';
import { Modal, Input, Button, message } from 'antd';
import axios from 'axios';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';

interface SymDTO {
    symptonName: string;
}

interface AddSymptomModalProps {
    visible: boolean;
    onCancel: () => void;
}

const AddSymptomModal: React.FC<AddSymptomModalProps> = ({ visible, onCancel }) => {
    const { control, handleSubmit, formState: { errors } } = useForm<SymDTO>();
    const [loading, setLoading] = useState(false);

    const onSubmit: SubmitHandler<SymDTO> = async (data) => {
        try {
            setLoading(true);
            console.log(data.symptonName);
            console.log(typeof data.symptonName);



            await axios.post('https://garagesystem.azurewebsites.net/api/Booking/sympton/create', null, {
                params: {
                    symptonName: data.symptonName

                }
            });

            message.success('Symptom added successfully');
            onCancel(); // Đóng modal sau khi thêm thành công
        } catch (error) {
            console.error('Error adding symptom:', error);
            message.error('Failed to add symptom');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            title="Thêm Triệu Chứng"
            visible={visible}
            onCancel={onCancel}
            footer={[
                <Button key="cancel" onClick={onCancel}>
                    Hủy
                </Button>,
                <Button key="add" type="primary" loading={loading} onClick={handleSubmit(onSubmit)}>
                    Thêm Triệu Chứng
                </Button>,
            ]}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>Triệu Chứng</label>
                    <Controller
                        name="symptonName"
                        control={control}
                        defaultValue=""
                        rules={{ required: 'Please enter the symptom name' }}
                        render={({ field }) => <Input {...field} />}
                    />
                    {errors.symptonName && <span>{errors.symptonName.message}</span>}
                </div>
            </form>
        </Modal>
    );
};

export default AddSymptomModal;
