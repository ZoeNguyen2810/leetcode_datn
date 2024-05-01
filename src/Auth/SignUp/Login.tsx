import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import './Login.scss'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_ENDPOINT } from '../../Constant/api';

type LoginFormInputs = {
    username: string;
    password: string;
};

const LoginForm: React.FC = () => {
    const navigate = useNavigate();




    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormInputs>();

    const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
        const res = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}${API_ENDPOINT.LOGIN}`, {
            username: data.username,
            password: data.password
        })
        console.log(res.data);
        if (res.data === 'Authentication failed') {
            alert('sai username hoac password')
        } else {
            localStorage.setItem('token', res.data)
            navigate('/')

        }


    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='LoginForm'>
            <div>
                <label className='title'>Tên Đăng Nhập</label>
                <input className='inputLogin' {...register('username', { required: true })} />
                {errors.username && <span>This field is required</span>}
            </div>
            <div>
                <label className='title' >Mật Khẩu</label>
                <input className='inputLogin' {...register('password', { required: true })} type="password" />
                {errors.password && <span>This field is required</span>}
            </div>
            <button type="submit" className='buttonLogin'>Login</button>


            <div className="text">
                Bạn Chưa có tài khoản?
                <Link to='/SignUp' style={{ marginLeft: '20px' }} >Đăng Nhập</Link>
            </div>

            <Link to='/forgotPassword'>Bạn quên mật khẩu ?</Link>

        </form>
    );
};

export default LoginForm;
