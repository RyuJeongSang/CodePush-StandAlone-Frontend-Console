"use client";

import type { HistoryItem } from "@/types/commonType";
import { useState } from "react";

interface HistoryItemType extends HistoryItem {}

interface HistoryItemProps {
    historyItem: HistoryItemType;
}

export default function HistoryItem({ historyItem }: HistoryItemProps) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [formData, setFormData] = useState<HistoryItemType>(historyItem);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('업데이트된 히스토리:', formData);
        // 여기서 API 호출하여 데이터 업데이트
        setIsSidebarOpen(false);
    };

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
                <div className="mt-2 flex space-x-2">
                    <span className="px-2 py-1 bg-gray-100 text-xs rounded-full text-gray-600">
                        레이블: {historyItem.label}
                    </span>
                </div>
            </div>

            {/* 사이드바 */}
            {isSidebarOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-10 flex justify-end pointer-events-auto" onClick={() => setIsSidebarOpen(false)}>
                    <div className="w-96 bg-white h-full overflow-y-auto shadow-xl p-6 animate-slide-in" onClick={(e) => e.stopPropagation()}>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-indigo-700">히스토리 수정</h2>
                            <button 
                                onClick={() => setIsSidebarOpen(false)}
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
                                <label className="block text-sm font-medium text-gray-700 mb-1">라벨</label>
                                <input
                                    type="text"
                                    name="label"
                                    value={formData.label}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                />
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

                            <div className="flex space-x-4 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setIsSidebarOpen(false)}
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