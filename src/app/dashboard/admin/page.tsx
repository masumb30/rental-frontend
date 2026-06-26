"use client";

import React, { useState } from 'react';
import {
    Users, Building, ShoppingBag, CreditCard,
    Search, Shield, Check, X as CloseIcon,
    MessageSquare, MoreHorizontal, ChevronRight,
    UserPlus, CheckCircle2, AlertTriangle, Filter
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import UsersTab from './UsersTab';
import PropertiesTab from './PropertiesTab';

const allUsers = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Tenant", joined: "Jan 12, 2024" },
    { id: 2, name: "Jonathan Wick", email: "wick@owner.com", role: "Owner", joined: "Feb 10, 2024" },
    { id: 3, name: "Alice Cooper", email: "alice@test.com", role: "Tenant", joined: "Mar 05, 2024" },
];

const pendingProperties = [
    { id: 101, title: "Skyline Penthouse", owner: "Mark Zuck", location: "San Francisco", date: "June 17" },
    { id: 102, title: "Desert Mirage Villa", owner: "Elon M.", location: "Texas", date: "June 18" },
];

const allBookings = [
    { id: "B1", property: "Modern Skyline Villa", tenant: "Alice Cooper", date: "June 20", status: "Active" },
    { id: "B2", property: "Urban Loft", tenant: "Bob Vance", date: "June 22", status: "Pending" },
];

const transactions = [
    { id: "TX120", property: "Skyline Villa", tenant: "Alice C.", owner: "John W.", amount: 4500, date: "June 15" },
    { id: "TX121", property: "Urban Loft", tenant: "Bob V.", owner: "Sarah S.", amount: 3100, date: "June 14" },
];

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState('users');

    const tabs = [
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
                        {activeTab === 'users' && (
                            <UsersTab/>
                        )}

                        {activeTab === 'properties' && (
                            <PropertiesTab/>
                        )}

                        {/* Other tabs follow the same pattern... */}
                        {(activeTab === 'bookings' || activeTab === 'transactions') && (
                            <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-20 text-center space-y-6 border border-gray-100 dark:border-gray-800">
                                <div className="w-20 h-20 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto">
                                    <ShoppingBag className="w-10 h-10 text-gray-400" />
                                </div>
                                <h3 className="text-2xl font-bold">Advanced Management</h3>
                                <p className="text-gray-500 max-w-sm mx-auto">This section provides deep monitoring of all {activeTab} across the entire platform ecosystem.</p>
                                <div className="flex justify-center gap-4 pt-4">
                                    <div className="h-2 w-12 bg-blue-600 rounded-full"></div>
                                    <div className="h-2 w-2 bg-gray-200 rounded-full"></div>
                                    <div className="h-2 w-2 bg-gray-200 rounded-full"></div>
                                </div>
                            </div>
                        )}
                    </main>
                </div>
            </div>

            {/* Reject Modal */}
            
        </div>
    );
}
