import { processGetAppList } from '@/apis/common';
import LogoutButton from '@/components/buttons/LogoutButton';
import Link from 'next/link';

export default async function Home() {
    // API 호출 예시
    try {
        const response = await processGetAppList();
        const apps = response.data;
        
        return (
            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Codepush Front</h1>
                    <LogoutButton />
                </div>

                <div className="mt-6">
                    <h2 className="text-xl font-semibold mb-2">앱 목록</h2>
                    {apps.apps.length > 0 ? (
                        <ul className="space-y-2">
                            {apps.apps.map((app) => (
                                <Link href={`/${app.name}`} key={app.name} className="block">
                                    <li key={app.name} className="p-3 bg-gray-100 rounded">
                                        {app.name}
                                    </li>
                                </Link>
                            ))}
                        </ul>
                    ) : (
                        <p>등록된 앱이 없습니다.</p>
                    )}
                </div>
            </div>
        );
    } catch (error) {
        return (
            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Codepush Front</h1>
                    <LogoutButton />
                </div>
                <p className="text-red-500">API 호출 중 오류가 발생했습니다.</p>
            </div>
        );
    }
}
