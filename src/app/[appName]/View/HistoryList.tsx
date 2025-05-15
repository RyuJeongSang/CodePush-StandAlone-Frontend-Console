'use client'

import { clientGetAppDeploymentsHistory } from '@/apis/client'
import { useEffect, useState, useCallback } from 'react'
import { HistoryItemType } from '@/types/commonType';
import HistoryItem from '@/app/[appName]/Child/HistoryItem';
import PaginationButtons from '@/app/[appName]/Child/PaginationButtons';


interface HistoryListProps {
    appName: string
    deployments: string[]
}
const HistoryList = ({ appName, deployments }: HistoryListProps) => {
    const [deployment, setDeployment] = useState<string>(deployments[0])
    const [historyList, setHistoryList] = useState<HistoryItemType[]>([])
    const [page, setPage] = useState<number>(1);
    const itemsPerPage = 5;
    const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
    
    // 총 페이지 수 계산
    const totalPages = Math.ceil(historyList.length / itemsPerPage);
    
    // 현재 페이지에 표시할 항목들
    const currentItems = historyList.slice(
        (page - 1) * itemsPerPage, 
        page * itemsPerPage
    );

    // 데이터 새로고침 함수
    const refreshData = useCallback(async () => {
        setIsRefreshing(true);
        try {
            const historyData = await clientGetAppDeploymentsHistory(appName, deployment);
            setHistoryList(historyData.history.reverse());
        } finally {
            setIsRefreshing(false);
        }
    }, [appName, deployment]);

    useEffect(() => {
        const getHistory = async () => {
            await refreshData();
            setPage(1); // 배포 채널 변경시 첫 페이지로 리셋
        }
        getHistory();
    }, [appName, deployment, refreshData])

    return (
        <>
            <div className="mb-8 bg-white rounded-xl shadow-md p-6">
                <h1 className="text-2xl font-bold text-indigo-700 mb-4">{appName}</h1>
                <div className="flex space-x-4">
                    <div className="relative">
                        <select 
                            className="px-4 py-2 bg-indigo-50 rounded-lg text-indigo-700 font-medium appearance-none pr-8 cursor-pointer"
                            value={deployment}
                            onChange={(e) => setDeployment(e.target.value)}
                        >
                            {deployments.map((dep) => (
                                <option key={dep} value={dep}>
                                    배포 채널: {dep}
                                </option>
                            ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-indigo-700">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-800">배포 히스토리</h2>
                    <button 
                        onClick={refreshData} 
                        className={`p-2 rounded-full hover:bg-indigo-50 transition-colors ${isRefreshing ? 'animate-spin text-indigo-600' : 'text-gray-500'}`}
                        disabled={isRefreshing}
                        aria-label="새로고침"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
                <div className="grid gap-4">
                    {currentItems.map((history) => (
                        <HistoryItem 
                            key={history.label} 
                            historyItem={history} 
                            appName={appName} 
                            deployment={deployment} 
                            onUpdateSuccess={refreshData} 
                        />
                    ))}
                </div>
                
                {/* 페이지네이션 UI */}
                <PaginationButtons totalPages={totalPages} currentPage={page} onPageChange={setPage} />
            </div>
        </>
    )
}

export default HistoryList
