import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { getServerSideServerUrl, getServerSideToken } from './serverStorage';

// 서버 사이드 axios 인스턴스 생성 함수
export const createServerSideAxiosInstance = async (): Promise<AxiosInstance> => {
    const serverUrl = await getServerSideServerUrl();
    const token = await getServerSideToken();
    
    const instance = axios.create({
        baseURL: serverUrl || '',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    // 인터셉터에서는 이미 얻은 토큰 사용
    instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    });

    return instance;
}; 