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


const bookingRequests = [
    { id: 1, tenant: "Sarah Miller", property: "Modern Skyline Villa", amount: 4500, date: "July 01" },
    { id: 2, tenant: "Mike Ross", property: "Modern Skyline Villa", amount: 4500, date: "August 15" },
];

const Requests = () => {
    return (
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
    )
}

export default Requests