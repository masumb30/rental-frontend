"use client";

import React, { useState } from 'react';
import {
    Users, Building, ShoppingBag, CreditCard,
    Search, Shield, Check, X as CloseIcon,
    MessageSquare, MoreHorizontal, ChevronRight,
    UserPlus, CheckCircle2, AlertTriangle, Filter,
    User
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import UsersTab from './UsersTab';
import PropertiesTab from './PropertiesTab';
import BookingsTab from './BookingsTab';
import ProfileTab from './ProfileTab';




export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState('users');

    const tabs = [

        { id: 'profile', name: 'Profile', icon: User },
        { id: 'users', name: 'All Users', icon: Users },
        { id: 'properties', name: 'All Properties', icon: Building },
        { id: 'bookings', name: 'All Bookings', icon: ShoppingBag },
        { id: 'transactions', name: 'Transactions', icon: CreditCard },
    ];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-16 pb-24 font-sans">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Admin Sidebar */}
                    <aside className="lg:w-64 flex flex-col gap-2 shrink-0">
                        <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-[2rem] text-white space-y-4 mb-6 shadow-xl">
                            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center"><Shield className="w-6 h-6" /></div>
                            <div>
                                <h2 className="font-bold text-lg">Admin View</h2>
                                <p className="text-gray-400 text-xs font-medium">Control Center v2.0</p>
                            </div>
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

                    {/* Main Dashboard Area */}
                    <main className="flex-1 min-w-0">
                        {activeTab === 'profile' && (
                            <ProfileTab />
                        )}
                        {activeTab === 'users' && (
                            <UsersTab/>
                        )}

                        {activeTab === 'properties' && (
                            <PropertiesTab/>
                        )}

                        {/* Other tabs follow the same pattern... */}
                        {(activeTab === 'bookings' || activeTab === 'transactions') && (
                            <BookingsTab activeTab={activeTab} />
                        )}
                    </main>
                </div>
            </div>

            {/* Reject Modal */}
            
        </div>
    );
}
