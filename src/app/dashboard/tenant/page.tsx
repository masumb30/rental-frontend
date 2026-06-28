"use client";

import React, { useState } from 'react';
import {
    ShoppingBag, Heart, User, Calendar, MapPin,
    Trash2, ExternalLink, ChevronRight, LayoutDashboard,
    Clock, CheckCircle2, AlertCircle
} from 'lucide-react';
import { motion } from 'framer-motion';
import BookingTab from './BookingTab';
import FavoriteTab from './FavoriteTab';
import ProfileTab from './ProfileTab';
// Import your session client helper
import { authClient } from '@/lib/auth-client';

export default function TenantDashboard() {
    const [activeTab, setActiveTab] = useState('bookings');
    
    // Fetch live user session data
    const { data, isPending } = authClient.useSession();
    const userData = data?.user;

    const tabs = [
        { id: 'bookings', name: 'My Bookings', icon: ShoppingBag },
        { id: 'favorites', name: 'Favorites', icon: Heart },
        { id: 'profile', name: 'Profile', icon: User },
    ];

    // Helper to extract clean initials from names
    const getInitials = (name: string) => {
        if (!name) return "U";
        return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-16 pb-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Sidebar */}
                    <aside className="lg:w-64 flex flex-col gap-2">
                        {/* Redesigned Sidebar User Card with Live Session Logic */}
                        <div className="p-6 bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 mb-6 min-h-[168px] flex flex-col justify-center">
                            {isPending ? (
                                <div className="flex items-center justify-center py-4">
                                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                                </div>
                            ) : userData ? (
                                <>
                                    {userData.image ? (
                                        <img 
                                            src={userData.image} 
                                            alt={userData.name} 
                                            className="w-16 h-16 rounded-2xl object-cover mb-4 ring-2 ring-gray-100 dark:ring-gray-800"
                                        />
                                    ) : (
                                        <div className="w-16 h-16 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl mb-4 shadow-md shadow-blue-500/10">
                                            {getInitials(userData.name)}
                                        </div>
                                    )}
                                    <h2 className="font-bold text-lg truncate" title={userData.name}>
                                        {userData.name}
                                    </h2>
                                    <p className="text-xs text-gray-500 font-medium capitalize mt-0.5">
                                        Role: {userData.role || 'Tenant'}
                                    </p>
                                </>
                            ) : (
                                <>
                                    <div className="w-16 h-16 bg-gray-200 dark:bg-gray-800 rounded-2xl flex items-center justify-center text-gray-400 mb-4">
                                        <User className="w-6 h-6" />
                                    </div>
                                    <h2 className="font-bold text-lg text-gray-400">Guest User</h2>
                                    <p className="text-xs text-gray-400 mt-0.5">Please sign in</p>
                                </>
                            )}
                        </div>

                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-3 px-6 py-4 rounded-2xl font-bold transition-all ${activeTab === tab.id ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'text-gray-500 hover:bg-white dark:hover:bg-gray-900 hover:text-blue-600'}`}
                            >
                                <tab.icon className="w-5 h-5" />
                                <span>{tab.name}</span>
                            </button>
                        ))}
                    </aside>

                    {/* Main Content */}
                    <main className="flex-1">
                        {activeTab === 'bookings' && (
                            <BookingTab />
                        )}

                        {activeTab === 'favorites' && (
                            <FavoriteTab />
                        )}

                        {activeTab === 'profile' && (
                            <ProfileTab />
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
}