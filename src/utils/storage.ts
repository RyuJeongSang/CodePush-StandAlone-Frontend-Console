'use client';

import Cookies from 'js-cookie';

export const setServerUrl = (url: string) => {
    localStorage.setItem('serverUrl', url);
    Cookies.set('serverUrl', url, { path: '/' });
};

export const getServerUrl = (): string | null => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('serverUrl');
    }
    return null;
};

export const setToken = (token: string) => {
    localStorage.setItem('token', token);
    Cookies.set('token', token, { path: '/' });
};

export const getToken = (): string | null => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('token');
    }
    return null;
};

export const clearStorage = () => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('serverUrl');
        localStorage.removeItem('token');
        Cookies.remove('serverUrl');
        Cookies.remove('token');
    }
};

export const isConfigured = (): boolean => {
    if (typeof window !== 'undefined') {
        return !!localStorage.getItem('serverUrl') && !!localStorage.getItem('token');
    }
    return false;
}; 