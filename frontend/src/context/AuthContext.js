import React, { createContext, useContext, useState, useEffect } from 'react';
import API from '../api'; // Asegúrate de que esto apunta a tu instancia de Axios configurada

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Configurar el token en el encabezado de las solicitudes
    const setAuthToken = (token) => {
        if (token) {
            API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } else {
            delete API.defaults.headers.common['Authorization'];
        }
    };

    // Cargar el usuario autenticado al montar la aplicación
    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                setAuthToken(token);
                try {
                    const response = await API.get('/auth/me'); // Endpoint para obtener información del usuario actual
                    setUser(response.data);
                } catch (error) {
                    console.error('Error fetching user:', error);
                    setUser(null);
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    // Iniciar sesión
    const login = async (email, password) => {
        try {
            const response = await API.post('/auth/login', { email, password });
            setUser(response.data.user);
            localStorage.setItem('token', response.data.token); // Almacena el token en localStorage
            setAuthToken(response.data.token);
        } catch (error) {
            console.error('Error during login:', error);
            throw error; // Para manejar errores en el componente que llama a login
        }
    };

    // Cerrar sesión
    const logout = () => {
        setUser(null);
        localStorage.removeItem('token');
        setAuthToken(null);
    };

    const value = {
        user,
        login,
        logout,
        loading,
    };

    return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};