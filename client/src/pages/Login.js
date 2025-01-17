import React, { useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const { login } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            setErrors(null);
            await login({ email, password });
            navigate("/announcements");
        } catch (error) {
            if (error.response.data.errors) {
                setErrors(error.response.data.errors)
            } else {
                setErrors(error.response.data)
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='h-screen flex items-center justify-center p-6'>
            <div className='max-w-md w-full border rounded p-4'>
                <h2 className='text-2xl text-center'>Login</h2>
                {errors?.message && (
                    <p className='text-center text-sm text-red-500 my-4 p-2 bg-red-100 border-s-2 border-red-500'>{errors.message}</p>
                )}
                <form onSubmit={handleSubmit}>
                    <div className='mb-4'>
                        <label htmlFor='email' className='text-sm block mb-1'>Email</label>
                        <input
                            className='w-full px-4 py-2 text-sm rounded border'
                            id='email'
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        {errors?.email?.length && (
                            errors.email.map((err, index) => <p key={index} className='text-xs text-red-500 mt-1'>{err}</p>)
                        )}
                    </div>
                    <div className='mb-4'>
                        <label htmlFor='password' className='text-sm block mb-1'>Password</label>
                        <input
                            className='w-full px-4 py-2 text-sm rounded border'
                            id='password'
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        {errors?.password?.length && (
                            errors.password.map((err, index) => <p key={index} className='text-xs text-red-500 mt-1'>{err}</p>)
                        )}
                    </div>
                    <button disabled={isLoading} type="submit" className='w-full text-white text-sm uppercase bg-blue-500 rounded py-2'>
                        {isLoading ? 'loading...' : 'Sign In'}
                    </button>
                    <p className='text-center text-sm mt-4'>
                        <span>Don't have account? </span>
                        <Link to='/register' className='font-bold text-blue-500 hover:underline'>Sign Up</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
