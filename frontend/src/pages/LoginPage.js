import React from 'react';
import AuthForm from '../components/AuthForm';
import API from '../api';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const navigate = useNavigate();

    const handleLogin = async (formData) => {
        try {
            const { data } = await API.post('/auth/login', formData);
            localStorage.setItem('token', data.token);
            navigate('/');
        } catch (error) {
            console.error('Login failed', error);
        }
    };

    return <AuthForm onSubmit={handleLogin} buttonText="Login" />;
};

export default LoginPage;