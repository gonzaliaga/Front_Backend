import React from 'react';
import AuthForm from '../components/AuthForm';
import API from '../api';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const navigate = useNavigate();

    const handleRegister = async (formData) => {
        try {
            const { data } = await API.post('/auth/register', formData);
            localStorage.setItem('token', data.token);
            navigate('/');
        } catch (error) {
            console.error('Registration failed', error);
        }
    };

    return <AuthForm onSubmit={handleRegister} buttonText="Register" />;
};

export default RegisterPage;