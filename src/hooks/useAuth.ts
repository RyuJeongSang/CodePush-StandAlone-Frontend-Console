'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getServerUrl, getToken, setServerUrl, setToken, isConfigured } from '@/utils/storage';
import Cookies from 'js-cookie';

export function useAuth() {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();

    useEffect(() => {
        const checkAuth = () => {
            const configured = isConfigured();
            setIsAuthenticated(configured);
            setLoading(false);

            if (!configured && window.location.pathname !== '/register') {
                router.push('/register');
            }
        };

        checkAuth();
    }, [router]);

    const login = (serverUrl: string, token: string) => {
        setServerUrl(serverUrl);
        setToken(token);
      
        Cookies.set('serverUrl', serverUrl, { path: '/' });
        Cookies.set('token', token, { path: '/' });
      
        setIsAuthenticated(true);
        router.push('/');
    };

    const logout = () => {
        localStorage.removeItem('serverUrl');
        localStorage.removeItem('token');
        Cookies.remove('serverUrl');
        Cookies.remove('token');

        setIsAuthenticated(false);
        router.push('/register');
    };

    return {
        isAuthenticated,
        loading,
        login,
        logout,
        serverUrl: getServerUrl(),
        token: getToken(),
    };
} 