'use client';

import { useAuth } from '@/hooks/useAuth';

export default function LogoutButton() {
    const { logout } = useAuth();

    return (
        <button
            onClick={logout}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
        >
            로그아웃
        </button>
    );
} 