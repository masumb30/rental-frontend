import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
    pageInfo: {
        totalPages: number;
        currentPage: number;
    };
    onPageChange: (page: number) => void;
}

const Pagination = ({ pageInfo, onPageChange }: PaginationProps) => {
    const { totalPages, currentPage } = pageInfo;

    // Guard clause: Only render if there are at least 2 pages
    if (totalPages < 2) return null;

    // Helper logic to generate page numbers with ellipses (...)
    const getPageNumbers = () => {
        const pages: (number | string)[] = [];
        const surveyRange = 1; // Number of pages to show around current page

        for (let i = 1; i <= totalPages; i++) {
            if (
                i === 1 || // Always show first page
                i === totalPages || // Always show last page
                (i >= currentPage - surveyRange && i <= currentPage + surveyRange) // Show neighborhood pages
            ) {
                pages.push(i);
            } else if (
                pages[pages.length - 1] !== '...'
            ) {
                pages.push('...');
            }
        }
        return pages;
    };

    return (
        <div className="flex justify-center items-center gap-2 mt-12 mb-6">
            {/* Previous Button */}
            <button
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
                className="p-2.5 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 disabled:opacity-40 disabled:hover:bg-transparent transition-all active:scale-95 cursor-pointer disabled:cursor-not-allowed"
            >
                <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Page Trackers */}
            <div className="flex items-center gap-1.5">
                {getPageNumbers().map((page, idx) => {
                    if (page === '...') {
                        return (
                            <span 
                                key={`ellipsis-${idx}`} 
                                className="px-3 py-2 text-gray-400 dark:text-gray-600 font-medium select-none"
                            >
                                ...
                            </span>
                        );
                    }

                    const isCurrent = page === currentPage;
                    return (
                        <button
                            key={`page-${page}`}
                            onClick={() => onPageChange(page as number)}
                            className={`px-4 py-2.5 rounded-xl font-bold text-sm transition-all active:scale-95 cursor-pointer ${
                                isCurrent
                                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 border border-transparent hover:border-gray-100 dark:hover:border-gray-800'
                            }`}
                        >
                            {page}
                        </button>
                    );
                })}
            </div>

            {/* Next Button */}
            <button
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
                className="p-2.5 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 disabled:opacity-40 disabled:hover:bg-transparent transition-all active:scale-95 cursor-pointer disabled:cursor-not-allowed"
            >
                <ChevronRight className="w-5 h-5" />
            </button>
        </div>
    );
};

export default Pagination;