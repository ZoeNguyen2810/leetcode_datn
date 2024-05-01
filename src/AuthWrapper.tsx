import React from 'react'
import LoginForm from './Auth/SignUp/Login'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'
import { Login } from '@mui/icons-material'

interface AuthWrapperProps {
  children?: React.ReactNode;
}

export const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
    const navigate = useNavigate();


    const [isAuthenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!!token) {
            setAuthenticated(true)
        } else {
            navigate('/login')
        }
    }, [navigate])

    return isAuthenticated ? <>{children}</> : <LoginForm />

}

