import { processGetAppDetail } from "@/apis/common";
import HistoryList from "@/app/[appName]/View/HistoryList";
import Link from "next/link";

const AppDetailPage = async ({ params }: { params: Promise<{ appName: string }> }) => {
    const { appName } = await params;
    const { data: appDetailInfo } = await processGetAppDetail(appName);

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="mb-4">
                    <Link href="/" className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        뒤로가기
                    </Link>
                </div>
                
                <HistoryList appName={appName} deployments={appDetailInfo.app.deployments} />
            </div>
        </div>
    );
};

export default AppDetailPage;
