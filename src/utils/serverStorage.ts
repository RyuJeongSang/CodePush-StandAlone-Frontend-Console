import { cookies } from 'next/headers';

export const getServerSideServerUrl = async (): Promise<string | null> => {
    const cookieStore = await cookies();
    return cookieStore.get('serverUrl')?.value || null;
};

export const getServerSideToken = async (): Promise<string | null> => {
    const cookieStore = await cookies();
    return cookieStore.get('token')?.value || null;
};

export const isServerSideConfigured = async (): Promise<boolean> => {
    const serverUrl = await getServerSideServerUrl();
    const token = await getServerSideToken();
    return !!serverUrl && !!token;
};