import { processGetAppList } from '@/apis/common';
import LogoutButton from '@/components/buttons/LogoutButton';
import Link from 'next/link';

export default async function Home() {
    try {
        const response = await processGetAppList();
        const apps = response.data;

        return (
            <div className="min-h-screen bg-gray-50 py-8 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                        <div className="flex justify-between items-center">
                            <h1 className="text-2xl font-bold text-indigo-700">Codepush Front</h1>
                            <LogoutButton />
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-md p-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-6">앱 목록</h2>
                        
                        {apps.apps.length > 0 ? (
                            <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-1">
                                {apps.apps.map((app) => (
                                    <Link href={`/${app.name}`} key={app.name} className="block">
                                        <div className="border border-gray-200 shadow-md hover:border-indigo-300 rounded-lg p-4 hover:bg-indigo-50 transition-colors cursor-pointer">
                                            <div className="flex justify-between items-center mb-2">
                                                <h3 className="font-medium text-indigo-700">{app.name}</h3>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                {app.deployments?.length > 0 ? (
                                                    <p>{app.deployments.length}개의 배포 채널</p>
                                                ) : (
                                                    <p>배포 채널 없음</p>
                                                )}
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <div className="bg-gray-50 rounded-lg p-6 text-center">
                                <p className="text-gray-600">등록된 앱이 없습니다.</p>
                                <p className="text-sm text-gray-500 mt-2">앱을 추가하려면 관리자에게 문의하세요.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.log('error', error);
        return (
            <div className="min-h-screen bg-gray-50 py-8 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                        <div className="flex justify-between items-center">
                            <h1 className="text-2xl font-bold text-indigo-700">Codepush Front</h1>
                            <LogoutButton />
                        </div>
                    </div>
                    
                    <div className="bg-white rounded-xl shadow-md p-6">
                        <div className="p-6 text-center">
                            <p className="text-red-500 font-medium mb-2">API 호출 중 오류가 발생했습니다.</p>
                            <p className="text-sm text-gray-500">잠시 후 다시 시도하거나 관리자에게 문의하세요.</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
