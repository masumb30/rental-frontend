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

const myProperties = [
    { id: 1, title: "Modern Skyline Villa", status: "Approved", feedback: "" },
    { id: 2, title: "Rustic Lake Cabin", status: "Rejected", feedback: "Image quality is too low and description is insufficient." },
    { id: 3, title: "City Center Loft", status: "Pending", feedback: "" },
];

const bookingRequests = [
    { id: 1, tenant: "Sarah Miller", property: "Modern Skyline Villa", amount: 4500, date: "July 01" },
    { id: 2, tenant: "Mike Ross", property: "Modern Skyline Villa", amount: 4500, date: "August 15" },
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
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-32 pb-24">
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
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="bg-white dark:bg-gray-900 p-8 rounded-[2rem] border border-gray-100 dark:border-gray-800 flex items-center gap-6 shadow-sm">
                                        <div className="w-14 h-14 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-2xl flex items-center justify-center">
                                            <DollarSign className="w-7 h-7" />
                                        </div>
                                        <div>
                                            <p className="text-gray-500 text-sm font-medium">Total Earnings</p>
                                            <p className="text-2xl font-black">$72,400</p>
                                        </div>
                                    </div>
                                    <div className="bg-white dark:bg-gray-900 p-8 rounded-[2rem] border border-gray-100 dark:border-gray-800 flex items-center gap-6 shadow-sm">
                                        <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-2xl flex items-center justify-center">
                                            <Building className="w-7 h-7" />
                                        </div>
                                        <div>
                                            <p className="text-gray-500 text-sm font-medium">Total Properties</p>
                                            <p className="text-2xl font-black">12</p>
                                        </div>
                                    </div>
                                    <div className="bg-white dark:bg-gray-900 p-8 rounded-[2rem] border border-gray-100 dark:border-gray-800 flex items-center gap-6 shadow-sm">
                                        <div className="w-14 h-14 bg-amber-100 dark:bg-amber-900/30 text-amber-600 rounded-2xl flex items-center justify-center">
                                            <Inbox className="w-7 h-7" />
                                        </div>
                                        <div>
                                            <p className="text-gray-500 text-sm font-medium">Total Bookings</p>
                                            <p className="text-2xl font-black">48</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white dark:bg-gray-900 p-10 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm">
                                    <div className="flex justify-between items-center mb-10">
                                        <div>
                                            <h3 className="text-xl font-bold">Earnings Overview</h3>
                                            <p className="text-sm text-gray-500">Revenue growth over the last 12 months</p>
                                        </div>
                                        <select className="bg-gray-50 dark:bg-gray-800 border-none rounded-xl px-4 py-2 text-xs font-bold font-sans">
                                            <option>Year 2024</option>
                                            <option>Year 2023</option>
                                        </select>
                                    </div>
                                    <div className="h-[350px] w-full">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <AreaChart data={chartData}>
                                                <defs>
                                                    <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                                    </linearGradient>
                                                </defs>
                                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                                <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                                                <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                                                <Tooltip
                                                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                                />
                                                <Area type="monotone" dataKey="earnings" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorEarnings)" />
                                            </AreaChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'add' && (
                            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-white dark:bg-gray-900 p-10 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm space-y-10">
                                <div>
                                    <h3 className="text-2xl font-bold mb-2">List a New Property</h3>
                                    <p className="text-gray-500">Detailed information helps you get approved faster.</p>
                                </div>

                                <form className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-4 col-span-2">
                                        <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Property Title</label>
                                        <input type="text" placeholder="e.g. Modern Villa with Pool" className="w-full p-4 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl outline-none focus:ring-2 focus:ring-blue-600 transition-all font-medium" />
                                    </div>
                                    <div className="space-y-4 col-span-2">
                                        <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Description</label>
                                        <textarea placeholder="Describe the lifestyle and key features..." className="w-full p-4 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl h-32 outline-none focus:ring-2 focus:ring-blue-600 transition-all font-medium" />
                                    </div>
                                    <div className="space-y-4">
                                        <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Location</label>
                                        <div className="relative">
                                            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                            <input type="text" placeholder="Full address" className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl outline-none" />
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Property Type</label>
                                        <select className="w-full p-4 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl outline-none appearance-none">
                                            <option>Apartment</option>
                                            <option>House</option>
                                            <option>Villa</option>
                                        </select>
                                    </div>
                                    <div className="space-y-4">
                                        <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Rent Price</label>
                                        <div className="relative">
                                            <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                            <input type="number" placeholder="0.00" className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl outline-none" />
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Rent Cycle</label>
                                        <select className="w-full p-4 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl outline-none appearance-none">
                                            <option>Monthly</option>
                                            <option>Weekly</option>
                                            <option>Daily</option>
                                        </select>
                                    </div>
                                    <div className="grid grid-cols-3 gap-4 col-span-2">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-gray-400 uppercase">Beds</label>
                                            <input type="number" className="w-full p-3 bg-gray-50 dark:bg-gray-800 border-none rounded-xl outline-none" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-gray-400 uppercase">Baths</label>
                                            <input type="number" className="w-full p-3 bg-gray-50 dark:bg-gray-800 border-none rounded-xl outline-none" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-gray-400 uppercase">Size (sqft)</label>
                                            <input type="number" className="w-full p-3 bg-gray-50 dark:bg-gray-800 border-none rounded-xl outline-none" />
                                        </div>
                                    </div>
                                    <div className="space-y-4 col-span-2">
                                        <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Images</label>
                                        <div className="border-2 border-dashed border-gray-100 dark:border-gray-800 rounded-[2rem] p-12 text-center space-y-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all cursor-pointer">
                                            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto"><ImageIcon className="w-6 h-6" /></div>
                                            <p className="text-sm font-medium">Click to upload or drag and drop images</p>
                                            <p className="text-xs text-gray-400">Maximum file size 10MB (JPG, PNG)</p>
                                        </div>
                                    </div>

                                    <button type="submit" className="col-span-2 bg-blue-600 text-white py-5 rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20 active:scale-95">
                                        Submit Property for Review
                                    </button>
                                </form>
                            </motion.div>
                        )}

                        {activeTab === 'properties' && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-2xl font-bold">Manage My Properties</h3>
                                    <button className="bg-blue-600 text-white px-6 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-blue-700 transition-all">
                                        <PlusCircle className="w-4 h-4" /> Add New
                                    </button>
                                </div>
                                <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm">
                                    <table className="w-full text-left">
                                        <thead>
                                            <tr className="bg-gray-50 dark:bg-gray-800/50">
                                                <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Property Name</th>
                                                <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Status</th>
                                                <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest text-right">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                                            {myProperties.map((p) => (
                                                <tr key={p.id} className="hover:bg-gray-50/50 transition-colors group">
                                                    <td className="px-8 py-8 font-bold">{p.title}</td>
                                                    <td className="px-8 py-8">
                                                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${p.status === 'Approved' ? 'bg-green-100 text-green-600' :
                                                                p.status === 'Rejected' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'
                                                            }`}>
                                                            {p.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-8 py-8 text-right">
                                                        <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                                            {p.status === 'Rejected' && (
                                                                <button
                                                                    onClick={() => { setCurrentFeedback(p.feedback); setShowRejectionModal(true); }}
                                                                    className="text-gray-400 hover:text-blue-600 p-2 bg-gray-100 dark:bg-gray-800 rounded-lg"
                                                                >
                                                                    <Eye className="w-4 h-4" />
                                                                </button>
                                                            )}
                                                            <button className="text-gray-400 hover:text-amber-600 p-2 bg-gray-100 dark:bg-gray-800 rounded-lg"><Edit3 className="w-4 h-4" /></button>
                                                            <button className="text-gray-400 hover:text-red-600 p-2 bg-gray-100 dark:bg-gray-800 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'requests' && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                                <h3 className="text-2xl font-bold">New Booking Inquiries</h3>
                                <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm">
                                    <table className="w-full text-left">
                                        <thead>
                                            <tr className="bg-gray-50 dark:bg-gray-800/50">
                                                <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Tenant</th>
                                                <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Property</th>
                                                <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Revenue</th>
                                                <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest text-right">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                                            {bookingRequests.map((req) => (
                                                <tr key={req.id} className="hover:bg-gray-50/50 transition-colors">
                                                    <td className="px-8 py-8 flex items-center gap-3">
                                                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center font-bold text-blue-600 text-sm">{req.tenant[0]}</div>
                                                        <div>
                                                            <p className="font-bold">{req.tenant}</p>
                                                            <p className="text-[10px] text-gray-400">{req.date}</p>
                                                        </div>
                                                    </td>
                                                    <td className="px-8 py-8 text-sm font-medium">{req.property}</td>
                                                    <td className="px-8 py-8 font-black text-blue-600">${req.amount}</td>
                                                    <td className="px-8 py-8 text-right">
                                                        <div className="flex justify-end gap-2">
                                                            <button className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition-colors"><Check className="w-5 h-5" /></button>
                                                            <button className="bg-red-50 text-red-600 p-2 rounded-lg hover:bg-red-600 hover:text-white transition-colors"><CloseIcon className="w-5 h-5" /></button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </motion.div>
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
