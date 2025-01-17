import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import axiosInstance from '../services/axiosInstance';
import { Link, useParams } from 'react-router-dom';

const ViewAnnouncement = () => {
    const { id } = useParams();
    const { token } = useContext(AuthContext);

    const [announcement, setAnnouncement] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            const response = await axiosInstance.get(`/announcements/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setAnnouncement(response.data);
        }

        try {
            fetchData();
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }, [id, token]);

    return (
        <div className='py-6'>
            {isLoading ? <p className='text-center'>loading..</p> : (
                <div className='mx-auto max-w-md w-full border rounded p-4 space-y-4'>
                    <h1 className='text-2xl'>Announcement Details</h1>
                    <div className='space-y-2'>
                        <p>
                            <span className='text-gray-500 mr-2'>Title:</span>
                            <span className='font-bold'>{announcement?.title}</span>
                        </p>
                        <p>
                            <span className='text-gray-500 mr-2'>Content:</span>
                            <span className='font-bold'>{announcement?.content}</span>
                        </p>
                        <p>
                            <span className='text-gray-500 mr-2'>Start Date:</span>
                            <span className='font-bold'>{announcement?.start_date}</span>
                        </p>
                        <p>
                            <span className='text-gray-500 mr-2'>End Date:</span>
                            <span className='font-bold'>{announcement?.end_date}</span>
                        </p>
                        <p>
                            <span className='text-gray-500 mr-2'>Status:</span>
                            {announcement?.active ? (
                                <span className="px-4 text-white p-1 rounded-full bg-blue-500 text-center">Active</span>
                            ) : (
                                <span className="px-4 text-white p-1 rounded-full bg-red-500 text-center">Inactive</span>
                            )}
                        </p>
                    </div>
                    <Link to='/announcements' className='px-4 py-2 inline-block text-sm uppercase bg-gray-200 rounded'>Back</Link>
                </div>
            )}
        </div>
    )
}

export default ViewAnnouncement