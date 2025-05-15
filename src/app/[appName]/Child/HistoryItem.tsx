"use client";

import { HistoryItemType } from "@/types/commonType";
import { useEffect, useState } from "react";
import { Switch } from '@headlessui/react';
import { clientPatchAppDeploymentItem } from "@/apis/client";

interface HistoryItemProps {
    historyItem: HistoryItemType;
    appName: string;
    deployment: string;
    onUpdateSuccess: () => Promise<void>;
}

export default function HistoryItem({ historyItem, appName, deployment, onUpdateSuccess }: HistoryItemProps) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [formData, setFormData] = useState<HistoryItemType>(historyItem);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const onCloseSidebar = () => {
        setIsSidebarOpen(false);
        setFormData(historyItem);
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        processUpdateHistory({ description: formData.description, isDisabled: formData.isDisabled });
        onCloseSidebar();
    };

    useEffect(() => {
        setFormData(historyItem);
    }, [historyItem]);

    const processUpdateHistory = async ({ description, isDisabled }: { description?: string, isDisabled?: boolean }) => {
        try {
            await clientPatchAppDeploymentItem(appName, deployment, {
                label: historyItem.label,
                description: description ?? undefined,
                isDisabled: isDisabled ?? undefined,
            });
            
            // 업데이트 성공 시 데이터 새로고침
            await onUpdateSuccess();
        } catch (error) {
            console.error('히스토리 업데이트 실패:', error);
        }
    }

    return (
        <>
            <div 
                className="border border-gray-200 rounded-lg p-4 hover:bg-indigo-50 transition-colors cursor-pointer"
                onClick={() => setIsSidebarOpen(true)}
            >
                <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium text-indigo-700">{historyItem.appVersion}</h3>
                    <span className="text-sm text-gray-600">{new Date(historyItem.uploadTime).toLocaleString()}</span>
                </div>
                <p className="text-gray-700 whitespace-pre-line">{historyItem.description}</p>
                <div className="mt-2 flex space-x-2 justify-between">
                    <span className="px-2 py-1 bg-gray-100 text-xs rounded-full text-gray-600">
                        레이블: {historyItem.label}
                    </span>
                    <div 
                        className="pointer-events-auto"
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                    >
                        <Switch
                            checked={!historyItem.isDisabled}
                            onChange={(checked) => {
                                processUpdateHistory({ isDisabled: !checked });
                            }}
                            className={`${
                                !historyItem.isDisabled ? 'bg-indigo-600' : 'bg-gray-300'
                            } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none`}
                        >
                            <span className="sr-only">활성화 상태 변경</span>
                            <span
                                className={`${
                                    !historyItem.isDisabled ? 'translate-x-1' : 'translate-x-6'
                                } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                            />
                        </Switch>
                    </div>
                </div>
            </div>

            {/* 사이드바 */}
            {isSidebarOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-10 flex justify-end pointer-events-auto" onClick={onCloseSidebar}>
                    <div className="w-96 bg-white h-full overflow-y-auto shadow-xl p-6 animate-slide-in" onClick={(e) => e.stopPropagation()}>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-indigo-700">히스토리 수정</h2>
                            <button 
                                onClick={onCloseSidebar}
                                className="p-2 rounded-full hover:bg-gray-100"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">앱 버전</label>
                                <p className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">{formData.appVersion}</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">레이블</label>
                                <p className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">{formData.label}</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">설명</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows={6}
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                ></textarea>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">업로드 시간</label>
                                <input
                                    type="text"
                                    value={new Date(formData.uploadTime).toLocaleString()}
                                    readOnly
                                    className="w-full p-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">활성화</label>
                                <div className="flex items-center">
                                    <Switch
                                        checked={!formData.isDisabled}
                                        onChange={() => setFormData(prev => ({ ...prev, isDisabled: !prev.isDisabled }))}
                                        className={`${
                                            !formData.isDisabled ? 'bg-indigo-600' : 'bg-gray-300'
                                        } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none`}
                                    >
                                        <span className="sr-only">활성화 상태 변경</span>
                                        <span
                                            className={`${
                                                !formData.isDisabled ? 'translate-x-1' : 'translate-x-6'
                                            } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                                        />
                                    </Switch>
                                    <span className="ml-3 text-sm text-gray-600">
                                        {!formData.isDisabled ? '활성화됨' : '비활성화됨'}
                                    </span>
                                </div>
                            </div>

                            <div className="flex space-x-4 pt-4">
                                <button
                                    type="button"
                                    onClick={onCloseSidebar}
                                    className="flex-1 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                                >
                                    취소
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                                >
                                    저장
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
} 