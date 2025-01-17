import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Register';
import AnnouncementList from '../pages/AnnouncementList';
import Home from '../pages/Home';
import CreateAnnouncement from '../pages/CreateAnnouncement'
import EditAnnouncement from '../pages/EditAnnouncement';
import ViewAnnouncement from '../pages/ViewAnnouncement';
import ProtectedRoute from '../components/ProtectedRoute';

const AppRouter = () => {
    const NotFound = () => {
        return (
            <div className='h-screen flex flex-col items-center justify-center'>
                <div className='mb-4 text-center'>
                    <h1>404 - Page Not Found</h1>
                    <p>The page you are looking for does not exist.</p>
                </div>
                <Link to='/' className='px-4 py-2 inline-block rounded text-white bg-blue-500'>Go Back</Link>
            </div>
        );
    };

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                    path="/announcements"
                    element={
                        <ProtectedRoute><AnnouncementList /></ProtectedRoute>
                    }
                />
                <Route
                    path="/announcement/new"
                    element={
                        <ProtectedRoute><CreateAnnouncement /></ProtectedRoute>
                    }
                />
                <Route
                    path="/announcement/edit/:id"
                    element={
                        <ProtectedRoute><EditAnnouncement /></ProtectedRoute>
                    }
                />
                <Route
                    path="/announcement/view/:id"
                    element={
                        <ProtectedRoute><ViewAnnouncement /></ProtectedRoute>
                    }
                />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
};

export default AppRouter;
