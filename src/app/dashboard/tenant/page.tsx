"use client";

import React, { useState } from 'react';
import {
    ShoppingBag, Heart, User, Calendar, MapPin,
    Trash2, ExternalLink, ChevronRight, LayoutDashboard,
    Clock, CheckCircle2, AlertCircle
} from 'lucide-react';
import { motion } from 'framer-motion';

const bookings = [
    { id: "BK-9012", name: "Modern Skyline Villa", date: "June 15, 2024", amount: 4650, status: "Confirmed", payment: "Paid" },
    { id: "BK-8841", name: "Urban Loft", date: "May 20, 2024", amount: 3100, status: "Completed", payment: "Paid" },
    { id: "BK-7723", name: "Beachfront Paradise", date: "August 10, 2024", amount: 5350, status: "Pending", payment: "Unpaid" },
];

const favorites = [
    { id: 1, title: "Lakeside Cabin", location: "Lake Tahoe", price: 4200, type: "Cabin", image: "https://images.unsplash.com/photo-1464146072230-91cabc9fa7c0?auto=format&fit=crop&q=80&w=400" },
    { id: 2, title: "Modern Farmhouse", location: "Nashville", price: 3800, type: "House", image: "https://images.unsplash.com/photo-1549517045-bc93de075e53?auto=format&fit=crop&q=80&w=400" },
];

export default function TenantDashboard() {
    const [activeTab, setActiveTab] = useState('bookings');

    const tabs = [
        { id: 'bookings', name: 'My Bookings', icon: ShoppingBag },
        { id: 'favorites', name: 'Favorites', icon: Heart },
        { id: 'profile', name: 'Profile', icon: User },
    ];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-32 pb-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Sidebar */}
                    <aside className="lg:w-64 flex flex-col gap-2">
                        <div className="p-6 bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 mb-6">
                            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl mb-4">
                                JD
                            </div>
                            <h2 className="font-bold text-lg">John Doe</h2>
                            <p className="text-sm text-gray-500">Tenant Level: Gold</p>
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
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-2xl font-bold">Booking History</h3>
                                    <div className="flex gap-2">
                                        <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold rounded-lg uppercase tracking-wider">Active</span>
                                    </div>
                                </div>

                                <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 overflow-hidden">
                                    <table className="w-full text-left">
                                        <thead>
                                            <tr className="bg-gray-50 dark:bg-gray-800/50">
                                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Property</th>
                                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Booking Date</th>
                                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Amount</th>
                                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                                            {bookings.map((booking) => (
                                                <tr key={booking.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                                                    <td className="px-6 py-6 font-bold">{booking.name}</td>
                                                    <td className="px-6 py-6 text-gray-500 text-sm">{booking.date}</td>
                                                    <td className="px-6 py-6 font-bold">${booking.amount}</td>
                                                    <td className="px-6 py-6">
                                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${booking.status === 'Confirmed' ? 'bg-green-100 text-green-600' :
                                                                booking.status === 'Pending' ? 'bg-amber-100 text-amber-600' : 'bg-blue-100 text-blue-600'
                                                            }`}>
                                                            {booking.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-6 text-right">
                                                        <button className="text-blue-600 hover:bg-blue-50 p-2 rounded-lg"><ExternalLink className="w-4 h-4" /></button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'favorites' && (
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {favorites.map(item => (
                                    <div key={item.id} className="bg-white dark:bg-gray-900 p-4 rounded-3xl border border-gray-100 dark:border-gray-800 flex gap-4 group">
                                        <img src={item.image} className="w-24 h-24 rounded-2xl object-cover" alt="" />
                                        <div className="flex-1 flex flex-col justify-between py-1">
                                            <div>
                                                <h4 className="font-bold">{item.title}</h4>
                                                <p className="text-xs text-gray-500 flex items-center gap-1 mt-1"><MapPin className="w-3 h-3" /> {item.location}</p>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-blue-600 font-bold">${item.price}</span>
                                                <div className="flex gap-2">
                                                    <button className="text-gray-400 hover:text-red-500 p-1"><Trash2 className="w-4 h-4" /></button>
                                                    <button className="text-gray-400 hover:text-blue-500 p-1"><ExternalLink className="w-4 h-4" /></button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </motion.div>
                        )}

                        {activeTab === 'profile' && (
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 p-10 space-y-10 shadow-sm">
                                <div className="flex items-center gap-6">
                                    <div className="w-24 h-24 bg-blue-600 rounded-[2rem] flex items-center justify-center text-white font-bold text-4xl shadow-xl shadow-blue-500/20">JD</div>
                                    <div className="space-y-1">
                                        <h3 className="text-2xl font-bold">John Doe</h3>
                                        <p className="text-gray-500">john.doe@example.com</p>
                                        <div className="flex gap-2 pt-2">
                                            <span className="px-2 py-0.5 bg-green-100 text-green-600 text-[10px] font-bold rounded uppercase">Verified Identity</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Phone Number</label>
                                        <p className="font-bold px-5 py-3 bg-gray-50 dark:bg-gray-800 rounded-xl">+1 (555) 123-4567</p>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Nationality</label>
                                        <p className="font-bold px-5 py-3 bg-gray-50 dark:bg-gray-800 rounded-xl">United States</p>
                                    </div>
                                    <div className="space-y-2 col-span-1 md:col-span-2">
                                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Bio / Intro</label>
                                        <p className="font-medium px-5 py-4 bg-gray-50 dark:bg-gray-800 rounded-2xl text-gray-600 leading-relaxed">
                                            Lover of modern architectures and city skylines. Working as a product designer in Manhattan. Searching for a new home with plenty of natural light.
                                        </p>
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-gray-100 dark:border-gray-800">
                                    <button className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 active:scale-95">
                                        Update Profile
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
}
