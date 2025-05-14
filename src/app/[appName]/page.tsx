import { processGetAppDeploymentsHistory, processGetAppDetail } from "@/apis/common";
import HistoryItem from "@/app/[appName]/Child/HistoryItem";


const AppDetailPage = async ({ params }: { params: { appName: string } }) => {
    const { data: appDetailInfo } = await processGetAppDetail(params.appName);
    const { data: appHistoryData } = await processGetAppDeploymentsHistory(params.appName, appDetailInfo.app.deployments[0]);

    const historyItems = appHistoryData.history.reverse();

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8 bg-white rounded-xl shadow-md p-6">
                    <h1 className="text-2xl font-bold text-indigo-700 mb-4">{params.appName}</h1>
                    <div className="flex space-x-4">
                        <div className="px-4 py-2 bg-indigo-50 rounded-lg text-indigo-700 font-medium">
                            배포 채널: {appDetailInfo.app.deployments[0]}
                        </div>
                    </div>
                </div>
                
                <div className="bg-white rounded-xl shadow-md p-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-6">배포 히스토리</h2>
                    <div className="grid gap-4">
                        {historyItems.map((history) => (
                            <HistoryItem key={history.label} historyItem={history} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AppDetailPage;
