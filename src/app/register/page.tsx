'use client';

import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';

export default function Register() {
    const [serverUrl, setServerUrl] = useState('');
    const [token, setToken] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!serverUrl || !token) {
            setError('서버 URL과 토큰을 모두 입력해주세요.');
            return;
        }

        // 서버 URL 형식 검증
        try {
            new URL(serverUrl);
        } catch (e) {
            setError('유효한 URL을 입력해주세요.');
            return;
        }

        login(serverUrl, token);
    };

  return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-6 text-center">서버 설정</h1>
                
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">서버 URL</label>
                        <input
                            type="text"
                            value={serverUrl}
                            onChange={(e) => setServerUrl(e.target.value)}
                            className="w-full p-2 border rounded"
                            placeholder="https://your-api-server.com"
                        />
                    </div>
                
                    <div className="mb-6">
                        <label className="block text-sm font-medium mb-1">인증 토큰</label>
                        <input
                            type="password"
                            value={token}
                            onChange={(e) => setToken(e.target.value)}
                            className="w-full p-2 border rounded"
                            placeholder="Bearer 토큰을 입력하세요"
                        />
                    </div>
                
                    {error && (
                        <div className="mb-4 text-red-500 text-sm">{error}</div>
                    )}
                
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                    >
                        설정 저장
                    </button>
                </form>
            </div>
        </div>
    );
}