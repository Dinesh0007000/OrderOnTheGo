import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://orderonthego.onrender.com'
});

export default axiosInstance;
