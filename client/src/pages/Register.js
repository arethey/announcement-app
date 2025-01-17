import React, { useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });
    const [errors, setErrors] = useState({})
    const [isLoading, setIsLoading] = useState(false)

    const { register } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setIsLoading(true);
            setErrors(null);
            await register(formData);
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
                <h2 className='text-2xl text-center'>Register</h2>
                {errors?.message && (
                    <p className='text-center text-sm text-red-500 my-4 p-2 bg-red-100 border-s-2 border-red-500'>{errors.message}</p>
                )}
                <form onSubmit={handleSubmit}>
                    <div className='mb-4'>
                        <label htmlFor='name' className='text-sm block mb-1'>Name</label>
                        <input
                            className='w-full px-4 py-2 text-sm rounded border'
                            id='name'
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                        />
                        {errors?.name?.length && (
                            errors.name.map((err, index) => <p key={index} className='text-xs text-red-500 mt-1'>{err}</p>)
                        )}
                    </div>
                    <div className='mb-4'>
                        <label htmlFor='email' className='text-sm block mb-1'>Email</label>
                        <input
                            className='w-full px-4 py-2 text-sm rounded border'
                            id='email'
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            required
                        />
                        {errors?.password?.length && (
                            errors.password.map((err, index) => <p key={index} className='text-xs text-red-500 mt-1'>{err}</p>)
                        )}
                    </div>
                    <div className='mb-4'>
                        <label htmlFor='confirm_password' className='text-sm block mb-1'>Confirm Password</label>
                        <input
                            className='w-full px-4 py-2 text-sm rounded border'
                            id='confirm_password'
                            type="password"
                            placeholder="Confirm Password"
                            value={formData.password_confirmation}
                            onChange={(e) =>
                                setFormData({ ...formData, password_confirmation: e.target.value })
                            }
                            required
                        />
                        {errors?.password_confirmation?.length && (
                            errors.password_confirmation.map((err, index) => <p key={index} className='text-xs text-red-500 mt-1'>{err}</p>)
                        )}
                    </div>
                    <button disabled={isLoading} type="submit" className='w-full text-white text-sm uppercase bg-blue-500 rounded py-2'>
                        {isLoading ? 'loading...' : 'Sign Up'}
                    </button>
                    <p className='text-center text-sm mt-4'>
                        <span>Already have account? </span>
                        <Link to='/login' className='font-bold text-blue-500 hover:underline'>Sign In</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Register;
