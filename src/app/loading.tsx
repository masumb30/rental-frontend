"use client";

import React from 'react';
import { Loader2 } from 'lucide-react';

export default function Loading() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col items-center justify-center space-y-6">
            <div className="relative">
                <Loader2 className="w-16 h-16 text-blue-600 animate-spin" />
                <div className="absolute inset-0 bg-blue-600/20 blur-xl rounded-full"></div>
            </div>
            <div className="space-y-2 text-center">
                <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                    RentEase is loading...
                </h2>
                <p className="text-gray-500 font-medium animate-pulse">Finding your perfect home paradise</p>
            </div>
        </div>
    );
}
