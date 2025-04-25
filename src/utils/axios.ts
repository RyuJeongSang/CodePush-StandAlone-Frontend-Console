import axios from 'axios';

export const getAuthToken = () => {
    return process.env.NEXT_PUBLIC_CODEPUSH_KEY;
};


const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_CODEPUSH_SERVER_URL,
    timeout: 10000,
});

// Request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        const token = getAuthToken();

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        console.log(`errorStatus: ${error.response?.status}`);
        console.log(`error: ${JSON.stringify(error, null, 2)}`);
        return Promise.reject(error);
    }
);

export default axiosInstance;
