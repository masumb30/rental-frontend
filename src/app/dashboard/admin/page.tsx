"use client";

import React, { useState } from 'react';
import {
    Users, Building, ShoppingBag, CreditCard,
    Search, Shield, Check, X as CloseIcon,
    MessageSquare, MoreHorizontal, ChevronRight,
    UserPlus, CheckCircle2, AlertTriangle, Filter
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
    const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);

    const tabs = [
        { id: 'users', name: 'All Users', icon: Users },
        { id: 'properties', name: 'All Properties', icon: Building },
        { id: 'bookings', name: 'All Bookings', icon: ShoppingBag },
        { id: 'transactions', name: 'Transactions', icon: CreditCard },
    ];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-32 pb-24 font-sans">
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
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-2xl font-black text-gray-900 dark:text-white">Platform Users</h3>
                                    <div className="flex gap-2">
                                        <div className="relative">
                                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                            <input type="text" placeholder="Search users..." className="pl-10 pr-4 py-2 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl text-sm" />
                                        </div>
                                        <button className="bg-white dark:bg-gray-900 p-2 rounded-xl border border-gray-100 dark:border-gray-800"><Filter className="w-5 h-5 text-gray-400" /></button>
                                    </div>
                                </div>

                                <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm">
                                    <table className="w-full text-left">
                                        <thead>
                                            <tr className="bg-gray-50/80 dark:bg-gray-800/50">
                                                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Full Name</th>
                                                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Role</th>
                                                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Joined Date</th>
                                                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                                            {allUsers.map((u) => (
                                                <tr key={u.id} className="hover:bg-gray-50/50 transition-colors">
                                                    <td className="px-8 py-6">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/30 rounded-xl flex items-center justify-center font-bold text-blue-600 text-sm">{u.name[0]}</div>
                                                            <div>
                                                                <p className="font-bold text-gray-900 dark:text-white">{u.name}</p>
                                                                <p className="text-xs text-gray-400">{u.email}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-8 py-6">
                                                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${u.role === 'Owner' ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'}`}>
                                                            {u.role}
                                                        </span>
                                                    </td>
                                                    <td className="px-8 py-6 text-sm text-gray-500">{u.joined}</td>
                                                    <td className="px-8 py-6 text-right">
                                                        <button className="text-gray-400 hover:text-blue-600 p-2"><MoreHorizontal className="w-5 h-5" /></button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'properties' && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                                <h3 className="text-2xl font-black">Property Approval Queue</h3>
                                <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm">
                                    <table className="w-full text-left">
                                        <thead>
                                            <tr className="bg-gray-50/80 dark:bg-gray-800/50">
                                                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Property & Owner</th>
                                                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Submitted</th>
                                                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                                            {pendingProperties.map((p) => (
                                                <tr key={p.id} className="hover:bg-gray-50/50 transition-colors">
                                                    <td className="px-8 py-6">
                                                        <div>
                                                            <p className="font-black text-gray-900 dark:text-white">{p.title}</p>
                                                            <p className="text-xs text-gray-400 italic">Owner: {p.owner} • {p.location}</p>
                                                        </div>
                                                    </td>
                                                    <td className="px-8 py-6 text-sm text-gray-500 font-medium">{p.date}</td>
                                                    <td className="px-8 py-6 text-right">
                                                        <div className="flex justify-end gap-2">
                                                            <button className="bg-green-600 text-white p-2.5 rounded-xl hover:bg-green-700 shadow-lg shadow-green-500/20 active:scale-95 transition-all"><Check className="w-5 h-5" /></button>
                                                            <button
                                                                onClick={() => setIsRejectModalOpen(true)}
                                                                className="bg-red-50 text-red-600 p-2.5 rounded-xl hover:bg-red-600 hover:text-white transition-all active:scale-95"
                                                            >
                                                                <CloseIcon className="w-5 h-5" />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </motion.div>
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
            <AnimatePresence>
                {isRejectModalOpen && (
                    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsRejectModalOpen(false)} className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="relative bg-white dark:bg-gray-900 w-full max-w-xl rounded-[3rem] p-12 shadow-2xl"
                        >
                            <div className="flex justify-between items-center mb-10">
                                <h3 className="text-2xl font-black">Rejection Feedback</h3>
                                <button onClick={() => setIsRejectModalOpen(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"><CloseIcon className="w-6 h-6" /></button>
                            </div>
                            <div className="space-y-6">
                                <p className="text-gray-500 font-medium">Please provide a reason for rejecting this property listing. The owner will see this feedback.</p>
                                <textarea
                                    placeholder="Describe the issues found..."
                                    className="w-full p-6 bg-gray-50 dark:bg-gray-800 border-none rounded-3xl h-48 outline-none focus:ring-2 focus:ring-red-500 transition-all font-medium"
                                />
                                <div className="flex gap-4">
                                    <button onClick={() => setIsRejectModalOpen(false)} className="flex-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 py-4 rounded-2xl font-bold hover:bg-gray-200 transition-all">Cancel</button>
                                    <button onClick={() => setIsRejectModalOpen(false)} className="flex-[2] bg-red-600 text-white py-4 rounded-2xl font-bold hover:bg-red-700 transition-all shadow-xl shadow-red-500/20">Confirm Rejection</button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
