"use client";

import React from 'react';
import Link from 'next/link';
import { Home, AlertTriangle, ArrowLeft, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-2xl w-full bg-white dark:bg-gray-900 rounded-[3rem] p-12 md:p-20 shadow-2xl border border-gray-100 dark:border-gray-800 text-center space-y-10"
            >
                <div className="relative inline-block">
                    <div className="w-24 h-24 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto">
                        <AlertTriangle className="w-12 h-12 text-red-600" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-white dark:bg-gray-900 rounded-full flex items-center justify-center shadow-lg">
                        <div className="w-4 h-4 bg-red-600 rounded-full animate-ping"></div>
                    </div>
                </div>

                <div className="space-y-4">
                    <h1 className="text-4xl font-black text-gray-900 dark:text-white leading-tight">Something went wrong!</h1>
                    <p className="text-gray-500 text-lg max-w-md mx-auto">
                        We encountered an unexpected error while trying to find your dream property. Our team has been notified.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row justify-center gap-4 pt-6">
                    <button
                        onClick={() => reset()}
                        className="flex items-center justify-center gap-3 bg-blue-600 text-white px-10 py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20 active:scale-95"
                    >
                        <RefreshCw className="w-5 h-5" /> Try Again
                    </button>
                    <Link
                        href="/"
                        className="flex items-center justify-center gap-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-10 py-4 rounded-2xl font-bold hover:bg-gray-200 transition-all active:scale-95"
                    >
                        <Home className="w-5 h-5" /> Back Home
                    </Link>
                </div>

                <div className="pt-10 border-t border-gray-50 dark:border-gray-800">
                    <p className="text-gray-400 text-xs font-mono">Error Digest: {error.digest || "N/A"}</p>
                </div>
            </motion.div>
        </div>
    );
}
