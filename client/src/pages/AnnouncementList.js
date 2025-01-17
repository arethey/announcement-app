import React, { useState, useEffect, useContext } from "react";
import AuthContext from '../context/AuthContext';
import { Link } from "react-router-dom";
import axiosInstance from "../services/axiosInstance";

const AnnouncementList = () => {
    const { token } = useContext(AuthContext);
    const [announcements, setAnnouncements] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (token) {
            async function fetchData() {
                const response = await axiosInstance.get('/announcements', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setAnnouncements(response.data)
            }

            try {
                fetchData();
            } catch (error) {
                console.log(error)
            } finally {
                setIsLoading(false)
            }
        }
    }, [token]);

    const handleDelete = async (id) => {
        try {
            await axiosInstance.delete(`/announcements/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setAnnouncements(announcements.filter(announcement => announcement.id !== id));
            alert("Announcement deleted successfully!")
        } catch (error) {
            console.error('Failed to delete announcement:', error);
        }
    };

    return (
        <div className="p-6 space-y-4">
            <div className="max-w-7xl mx-auto space-y-4">
                <div className="flex items-center justify-between gap-4">
                    <h1 className="text-2xl font-bold">Announcements</h1>
                    <Link to='/announcement/new' className="py-2 px-4 rounded inline-block bg-blue-500 text-white">New Announcement</Link>
                </div>
                {isLoading ? <p>loading...</p> : (
                    <div className="relative overflow-x-auto">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Title
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Content
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Start Date
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        End Date
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Status
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {announcements.map(announcement => (
                                    <tr key={announcement.id} className="bg-white border-b">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            {announcement.title}
                                        </th>
                                        <td className="px-6 py-4">
                                            {announcement.content}
                                        </td>
                                        <td className="px-6 py-4">
                                            {announcement.start_date}
                                        </td>
                                        <td className="px-6 py-4">
                                            {announcement.end_date}
                                        </td>
                                        <td className="px-6 py-4">
                                            {announcement.active ? (
                                                <span className="px-4 text-xs text-white p-1 rounded-full bg-blue-500 text-center">Active</span>
                                            ) : (
                                                <span className="px-4 text-xs text-white p-1 rounded-full bg-red-500 text-center">Inactive</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <Link to={`/announcement/edit/${announcement.id}`}>Edit</Link>
                                                <button onClick={() => handleDelete(announcement.id)}>Delete</button>
                                                <Link to={`/announcement/view/${announcement.id}`}>View</Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}

export default AnnouncementList;