'use client'

import { clientGetAppDeploymentsHistory } from '@/apis/client'
import { useEffect, useState } from 'react'
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
    
    // 총 페이지 수 계산
    const totalPages = Math.ceil(historyList.length / itemsPerPage);
    
    // 현재 페이지에 표시할 항목들
    const currentItems = historyList.slice(
        (page - 1) * itemsPerPage, 
        page * itemsPerPage
    );

    useEffect(() => {
        const getHistory = async () => {
            const historyData = await clientGetAppDeploymentsHistory(appName, deployment);
            setHistoryList(historyData.history.reverse());
            setPage(1); // 배포 채널 변경시 첫 페이지로 리셋
        }
        getHistory();
    }, [appName, deployment])

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
                <h2 className="text-xl font-semibold text-gray-800 mb-6">배포 히스토리</h2>
                <div className="grid gap-4">
                    {currentItems.map((history) => (
                        <HistoryItem key={history.label} historyItem={history} />
                    ))}
                </div>
                
                {/* 페이지네이션 UI */}
                <PaginationButtons totalPages={totalPages} currentPage={page} onPageChange={setPage} />
            </div>
        </>
    )
}

export default HistoryList
