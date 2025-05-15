'use client';

import { Dispatch, SetStateAction, useState } from 'react';

interface PaginationButtonsProps {
    totalPages: number;
    currentPage: number;
    onPageChange: Dispatch<SetStateAction<number>>;
}

export default function PaginationButtons({ totalPages, currentPage, onPageChange }: PaginationButtonsProps) {

    // 페이지 그룹 계산 (최대 5개 페이지 번호 표시)
    const getPageNumbers = () => {
        let startPage = Math.max(1, currentPage - 2);
        let endPage = Math.min(totalPages, startPage + 4);
        
        // 5개 페이지 번호가 보이도록 조정
        if (endPage - startPage < 4 && totalPages > 5) {
            if (startPage === 1) {
                endPage = Math.min(5, totalPages);
            } else {
                startPage = Math.max(1, endPage - 4);
            }
        }
        
        return Array.from({length: endPage - startPage + 1}, (_, i) => startPage + i);
    };

    return totalPages > 1 && (
        <div className="flex justify-center items-center mt-6 space-x-2">
            {/* 맨 처음 페이지 버튼 */}
            <button 
                className={`w-8 h-8 flex items-center justify-center rounded ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-indigo-600 hover:bg-indigo-50'}`}
                onClick={() => onPageChange(1)} 
                disabled={currentPage === 1}
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414zm-6 0a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L5.414 10l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
            </button>
            
            {/* 이전 페이지 버튼 */}
            <button 
                className={`w-8 h-8 flex items-center justify-center rounded ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-indigo-600 hover:bg-indigo-50'}`}
                onClick={() => onPageChange(prev => Math.max(prev - 1, 1))} 
                disabled={currentPage === 1}
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
            </button>
            
            {/* 페이지 번호 */}
            {getPageNumbers().map(number => (
                <button
                    key={number}
                    className={`w-8 h-8 rounded ${currentPage === number ? 'bg-indigo-600 text-white' : 'text-indigo-600 hover:bg-indigo-50'}`}
                    onClick={() => onPageChange(number)}
                >
                    {number}
                </button>
            ))}
            
            {/* 다음 페이지 버튼 */}
            <button 
                className={`w-8 h-8 flex items-center justify-center rounded ${currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-indigo-600 hover:bg-indigo-50'}`}
                onClick={() => onPageChange(prev => Math.min(prev + 1, totalPages))} 
                disabled={currentPage === totalPages}
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
            </button>
            
            {/* 맨 마지막 페이지 버튼 */}
            <button 
                className={`w-8 h-8 flex items-center justify-center rounded ${currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-indigo-600 hover:bg-indigo-50'}`}
                onClick={() => onPageChange(totalPages)} 
                disabled={currentPage === totalPages}
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 15.707a1 1 0 001.414 0l5-5a1 1 0 000-1.414l-5-5a1 1 0 00-1.414 1.414L8.586 10 4.293 14.293a1 1 0 000 1.414zm6 0a1 1 0 001.414 0l5-5a1 1 0 000-1.414l-5-5a1 1 0 00-1.414 1.414L14.586 10l-4.293 4.293a1 1 0 000 1.414z" clipRule="evenodd" />
                </svg>
            </button>
        </div>
    )
}
