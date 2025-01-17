import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost/api', // Replace with your Laravel API URL
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosInstance;
