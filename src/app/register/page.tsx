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
            console.log('e', e);
            return;
        }

        login(serverUrl, token);
    };

  return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50 py-8">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-6 text-center">코드푸시 서버 정보 입력</h1>
                
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
                            placeholder="로그인 토큰을 입력하세요"
                        />
                    </div>
                
                    {error && (
                        <div className="mb-4 text-red-500 text-sm">{error}</div>
                    )}
                
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
                    >
                        설정 저장
                    </button>
                </form>

                <div className="mt-8 p-4 bg-gray-100 rounded-lg text-sm">
                    <h2 className="font-semibold mb-2">토큰 및 서버 확인 방법</h2>
                    <p className="mb-2">PC에서 다음 경로의 파일을 확인하세요:</p>

                    <p className="mb-2">윈도우</p>
                    <code className="block bg-gray-200 p-2 rounded whitespace-nowrap overflow-x-auto mb-4">
                        C:\Users\&lt;유저이름&gt;\AppData\Local\.code-push.config
                    </code>
                    <p className="mb-2">Mac</p>
                    <code className="block bg-gray-200 p-2 rounded whitespace-nowrap overflow-x-auto">
                        ~/Users/&lt;유저이름&gt;/.code-push.config
                    </code>
                </div>
            </div>
        </div>
    );
}