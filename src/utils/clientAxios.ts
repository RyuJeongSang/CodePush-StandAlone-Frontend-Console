import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { getServerUrl, getToken } from './storage';

// 클라이언트 사이드 axios 인스턴스
const createClientSideAxiosInstance = (): AxiosInstance => {
    const instance = axios.create({
        headers: {
            'Content-Type': 'application/json',
        },
    });

    instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
        const serverUrl = getServerUrl();
        if (serverUrl) {
            config.baseURL = serverUrl;
        }

        const token = getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    });

    return instance;
};

// 클라이언트 환경에서 사용하는 인스턴스
const axiosInstance = createClientSideAxiosInstance();

export default axiosInstance; 