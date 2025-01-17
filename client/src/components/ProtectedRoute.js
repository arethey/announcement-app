import React, { useContext } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import AuthContext from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { token, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            navigate("/login");
        } catch (error) {
            console.log(error);
        }
    }

    return token ? (
        <div>
            <div className='py-4 shadow'>
                <div className='w-full max-w-7xl mx-auto flex items-center justify-between gap-4'>
                    <Link to='/'>Home</Link>
                    <button onClick={handleLogout}>logout</button>
                </div>
            </div>
            {children}
        </div>
    ) : <Navigate to="/login" />;
};

export default ProtectedRoute;
