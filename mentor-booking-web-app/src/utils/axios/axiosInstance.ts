import axios from 'axios';
import { BASE_URL } from '../apiUrl/baseUrl.ts';

// Creating an instance of Axios with a base URL
const axiosInstance = axios.create({
    baseURL: BASE_URL
})

// Adding a response interceptor to the Axios instance
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) =>
        Promise.reject(
            (error.response && error.response) || 'General Axios Error happened'
        )
)

export default axiosInstance;
