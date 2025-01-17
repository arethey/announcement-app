import React, { useState, useEffect } from "react";
import axiosInstance from "../services/axiosInstance";
import { Link } from "react-router-dom";

const Home = () => {
    const [announcements, setAnnouncements] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchAnnouncements = async () => {
            try {
                const response = await axiosInstance.get("/announcements/active");
                console.log(response.data);
                setAnnouncements(response.data);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false)
            }
        };

        fetchAnnouncements();
    }, []);

    return (
        <div className="p-6 max-w-2xl mx-auto space-y-4">
            <div className="flex items-center justify-between gap-4">
                <h1 className="text-3xl font-bold">
                    Announcements
                </h1>
                <Link to='/announcements' className="text-sm text-blue-500 hover:underline">View More</Link>
            </div>
            <div>
                {isLoading ? <p className='text-center'>loading..</p> : (
                    <div className="space-y-4">
                        {announcements.map(item => (
                            <div className="p-2 border rounded">
                                <div className="mb-4">
                                    <h1 className="font-bold text-2xl">{item.title}</h1>
                                    <p className="text-xs text-gray-500">{item.start_date} - {item.end_date}</p>
                                </div>
                                <p className="text-gray-500">{item.content}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Home;