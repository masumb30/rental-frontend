"use client";

import React, { useState } from 'react';
import {
    BarChart3, PlusCircle, Building, Inbox,
    Trash2, Edit3, Eye, Check, X as CloseIcon,
    TrendingUp, Users, DollarSign, Image as ImageIcon,
    MapPin, Home, Maximize2, Info
} from 'lucide-react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid,
    Tooltip, ResponsiveContainer, AreaChart, Area
} from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import Analytics from './Analytics';
import AddProperty from './AddProperty';
import Properties from './Properties';
import Requests from './Requests';

const chartData = [
    { name: 'Jan', earnings: 4000 },
    { name: 'Feb', earnings: 3000 },
    { name: 'Mar', earnings: 5000 },
    { name: 'Apr', earnings: 4500 },
    { name: 'May', earnings: 6000 },
    { name: 'Jun', earnings: 5500 },
    { name: 'Jul', earnings: 7000 },
    { name: 'Aug', earnings: 8000 },
    { name: 'Sep', earnings: 7500 },
    { name: 'Oct', earnings: 9000 },
    { name: 'Nov', earnings: 8500 },
    { name: 'Dec', earnings: 10000 },
];




export default function OwnerDashboard() {
    const [activeTab, setActiveTab] = useState('analytics');
    const [showRejectionModal, setShowRejectionModal] = useState(false);
    const [currentFeedback, setCurrentFeedback] = useState("");

    const tabs = [
        { id: 'analytics', name: 'Analytics', icon: BarChart3 },
        { id: 'add', name: 'Add Property', icon: PlusCircle },
        { id: 'properties', name: 'My Properties', icon: Building },
        { id: 'requests', name: 'Booking Requests', icon: Inbox },
    ];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-16 pb-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Sidebar */}
                    <aside className="lg:w-64 flex flex-col gap-2 shrink-0">
                        <div className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4 px-6">Owner Console</div>
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

                    {/* Main */}
                    <main className="flex-1 min-w-0">
                        {activeTab === 'analytics' && (
                            <Analytics chartData={chartData} />
                        )}

                        {activeTab === 'add' && (
                            <AddProperty />
                        )}

                        {activeTab === 'properties' && (
                            <Properties setCurrentFeedback={setCurrentFeedback} setShowRejectionModal={setShowRejectionModal} />
                        )}

                        {activeTab === 'requests' && (
                            <Requests />
                        )}
                    </main>
                </div>
            </div>

            {/* Rejection Feedback Modal */}
            <AnimatePresence>
                {showRejectionModal && (
                    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowRejectionModal(false)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
                        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative bg-white dark:bg-gray-900 w-full max-w-md rounded-[2.5rem] p-10 shadow-2xl">
                            <div className="flex justify-between items-center mb-8">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-red-100 text-red-600 rounded-xl flex items-center justify-center"><Info className="w-5 h-5" /></div>
                                    <h3 className="text-xl font-bold">Admin Feedback</h3>
                                </div>
                                <button onClick={() => setShowRejectionModal(false)} className="text-gray-400 hover:text-gray-900"><CloseIcon className="w-6 h-6" /></button>
                            </div>
                            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl mb-8">
                                <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-medium italic">"{currentFeedback}"</p>
                            </div>
                            <button
                                onClick={() => setShowRejectionModal(false)}
                                className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition-all"
                            >
                                Close Feedback
                            </button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
