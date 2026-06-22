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

const myProperties = [
    { id: 1, title: "Modern Skyline Villa", status: "Approved", feedback: "" },
    { id: 2, title: "Rustic Lake Cabin", status: "Rejected", feedback: "Image quality is too low and description is insufficient." },
    { id: 3, title: "City Center Loft", status: "Pending", feedback: "" },
];

const Properties = ({setCurrentFeedback, setShowRejectionModal}: { setCurrentFeedback: any, setShowRejectionModal: any }) => {
    return (
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
    )
}

export default Properties