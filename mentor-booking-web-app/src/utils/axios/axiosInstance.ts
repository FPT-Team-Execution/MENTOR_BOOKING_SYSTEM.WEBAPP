import { refreshToken } from './../../services/authService';
import axios from 'axios';
import { BASE_URL } from '../apiUrl/baseUrl.ts';

// Creating an instance of Axios with a base URL
const axiosInstance = axios.create({
    baseURL: BASE_URL
});

axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Adding a response interceptor to the Axios instance
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalConfig = error.config; // Store original request config

        if (error.response && error.response.status === 400 && !originalConfig._retry) {
            originalConfig._retry = true; // Mark this request as a retry
            const refresh = localStorage.getItem('refreshToken');

            if (refresh) {
                try {
                    const res = await refreshToken(refresh);
                    const newAccessToken = res?.data.responseModel.newJwtToken.accessToken;

                    if (newAccessToken) {
                        // Update local storage with the new access token
                        localStorage.setItem('accessToken', newAccessToken);
                        // Update the authorization header for the original request
                        originalConfig.headers['Authorization'] = `Bearer ${newAccessToken}`;

                        // Retry the original request
                        return axiosInstance(originalConfig);
                    }
                } catch (refreshError) {
                    // Handle token refresh errors (e.g., redirect to login)
                    console.error('Refresh token failed:', refreshError);
                    return Promise.reject(refreshError);
                }
            }
        }
        
        return Promise.reject(error);
    }
);

export default axiosInstance;
