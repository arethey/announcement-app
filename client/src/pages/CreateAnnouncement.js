import React, { useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import axiosInstance from '../services/axiosInstance';
import { Link, useNavigate } from 'react-router-dom';

const CreateAnnouncement = () => {
    const { token } = useContext(AuthContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: '',
        content: '',
        start_date: '',
        end_date: '',
    });
    const [errors, setErrors] = useState({})
    const [isSaving, setIsSaving] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            const response = await axiosInstance.post('/announcements', formData, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.status === 201) {
                alert("Announcement created successfully!")
                navigate('/announcements');
            }
        } catch (error) {
            console.error('Error creating announcement', error);
            if (error.response.data.errors) {
                setErrors(error.response.data.errors)
            } else {
                setErrors(error.response.data)
            }
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className='py-6'>
            <div className='mx-auto max-w-md w-full border rounded p-4 space-y-4'>
                <h1 className='text-2xl text-center'>Create Announcement</h1>
                <form onSubmit={handleSubmit}>
                    <div className='mb-4'>
                        <label htmlFor='title' className='text-sm block mb-1'>Title</label>
                        <input
                            className='w-full px-4 py-2 text-sm rounded border'
                            id='title'
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            required
                        />
                        {errors?.title?.length && (
                            errors.title.map((err, index) => <p key={index} className='text-xs text-red-500 mt-1'>{err}</p>)
                        )}
                    </div>
                    <div className='mb-4'>
                        <label htmlFor='content' className='text-sm block mb-1'>Content</label>
                        <textarea
                            className='w-full px-4 py-2 text-sm rounded border'
                            id='content'
                            rows={4}
                            value={formData.content}
                            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                            required
                        ></textarea>
                        {errors?.content?.length && (
                            errors.content.map((err, index) => <p key={index} className='text-xs text-red-500 mt-1'>{err}</p>)
                        )}
                    </div>
                    <div className='mb-4'>
                        <label htmlFor='start_date' className='text-sm block mb-1'>Start Date</label>
                        <input
                            className='w-full px-4 py-2 text-sm rounded border'
                            id='start_date'
                            type="date"
                            value={formData.start_date}
                            onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                            required
                        />
                        {errors?.start_date?.length && (
                            errors.start_date.map((err, index) => <p key={index} className='text-xs text-red-500 mt-1'>{err}</p>)
                        )}
                    </div>
                    <div className='mb-4'>
                        <label htmlFor='end_date' className='text-sm block mb-1'>End Date</label>
                        <input
                            className='w-full px-4 py-2 text-sm rounded border'
                            id='end_date'
                            type="date"
                            value={formData.end_date}
                            onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                            required
                        />
                        {errors?.end_date?.length && (
                            errors.end_date.map((err, index) => <p key={index} className='text-xs text-red-500 mt-1'>{err}</p>)
                        )}
                    </div>
                    <div className='flex items-center gap-4'>
                        <Link to='/announcements' className='px-4 py-2 inline-block text-sm uppercase bg-gray-200 rounded'>Cancel</Link>
                        <button disabled={isSaving} type="submit" className='px-4 py-2 inline-block text-white text-sm uppercase bg-blue-500 rounded'>
                            {isSaving ? 'loading...' : 'Save'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateAnnouncement