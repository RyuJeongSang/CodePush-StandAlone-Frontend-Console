import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { getServerSideServerUrl, getServerSideToken } from './serverStorage';
import { getServerUrl, getToken } from './storage';

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

// 클라이언트 환경에서만 바로 사용 가능한 인스턴스
const axiosInstance = typeof window === 'undefined' 
    ? null // SSR에서는 null로 설정하고 createServerSideAxiosInstance()를 직접 사용하도록 함
    : createClientSideAxiosInstance();

export default axiosInstance; 