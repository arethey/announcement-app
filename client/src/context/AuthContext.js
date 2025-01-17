import React, { createContext, useState } from 'react';
import axiosInstance from '../services/axiosInstance';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token') || null);

    const register = async (data) => {
        const response = await axiosInstance.post('/auth/register', data);
        setToken(response.data.access_token);
        localStorage.setItem('token', response.data.access_token);
        return response.data;
    };

    const login = async (data) => {
        const response = await axiosInstance.post('/auth/login', data);
        setToken(response.data.access_token);
        localStorage.setItem('token', response.data.access_token);
        return response.data;
    };

    const logout = async () => {
        await axiosInstance.post('/auth/logout', {}, {
            headers: { Authorization: `Bearer ${token}` },
        });
        setToken(null);
        setUser(null);
        localStorage.removeItem('token');
    };

    const fetchUser = async () => {
        if (token) {
            const response = await axiosInstance.get('/user', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUser(response.data);
        }
    };

    return (
        <AuthContext.Provider value={{ user, token, login, register, logout, fetchUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
