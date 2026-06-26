"use client";

import React, { useState } from 'react';
import {
    Users, Building, ShoppingBag, CreditCard,
    Search, Shield, Check, X as CloseIcon,
    MessageSquare, MoreHorizontal, ChevronRight,
    UserPlus, CheckCircle2, AlertTriangle, Filter
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import RoleSwitcherButton from './RoleSwitcherButton';

const UsersTab = () => {

    
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [updateOccured, setUpdateOccurred] = useState(1);

    React.useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true);
                // Replace with your actual API endpoint URL
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users`,{cache: 'no-store'});

                if (!response.ok) {
                    throw new Error('Failed to fetch platform users');
                }

                const data = await response.json();
                console.log("Fetched users:", data);
                setUsers(data.data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [updateOccured]); // Re-run the effect when updateOccured changes

    function formatReadableDate(isoString: string): string {
        const date = new Date(isoString);

        // Check for invalid date strings
        if (isNaN(date.getTime())) {
            throw new Error("Invalid ISO date string provided");
        }

        const day = date.getDate();

        // Determine the correct ordinal suffix (st, nd, rd, th)
        let suffix = "th";
        if (day < 11 || day > 13) {
            switch (day % 10) {
                case 1: suffix = "st"; break;
                case 2: suffix = "nd"; break;
                case 3: suffix = "rd"; break;
            }
        }

        // Get the lowercased full month name
        const month = date.toLocaleString("en-US", { month: "long" }).toLowerCase();
        const year = date.getFullYear();

        return `${day}${suffix} ${month} ${year}`;
    }


    return (
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

            <div className="bg-white dark:bg-gray-900 rounded-2xl md:rounded-[2.5rem] border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm">
                {/* Responsive wrapper to allow horizontal scrolling on tiny screens if needed */}
                <div className="w-full overflow-x-auto scrollbar-thin">
                    <table className="w-full text-left md:min-w-full table-auto">
                        <thead>
                            <tr className="bg-gray-50/80 dark:bg-gray-800/50">
                                <th className="px-4 md:px-8 py-4 md:py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Full Name</th>
                                <th className="px-4 md:px-8 py-4 md:py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Role</th>
                                {/* Hidden on small mobile devices, visible on tablet/desktop up */}
                                <th className="hidden sm:table-cell px-4 md:px-8 py-4 md:py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Joined Date</th>
                                <th className="px-4 md:px-8 py-4 md:py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                            {users.map((u: any) => (
                                <tr key={u._id} className="hover:bg-gray-50/10 transition-colors">
                                    {/* Name Column */}
                                    <td className="px-4 md:px-8 py-4 md:py-6">
                                        <div className="flex items-center gap-2 md:gap-3">
                                            <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-50 dark:bg-blue-900/30 rounded-lg md:rounded-xl flex items-center justify-center font-bold text-blue-600 text-xs md:text-sm shrink-0">
                                                {u.name ? u.name[0] : '?'}
                                            </div>
                                            <div className="min-w-0">
                                                <p className="font-bold text-sm md:text-base text-gray-900 dark:text-white truncate">{u.name}</p>
                                                <p className="text-[11px] md:text-xs text-gray-400 truncate">{u.email}</p>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Status Role Badge */}
                                    <td className="px-4 md:px-8 py-4 md:py-6">
                                        <span className={`px-2 md:px-3 py-0.5 md:py-1 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-wider whitespace-nowrap ${u.role === 'Owner' ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'
                                            }`}>
                                            {u.role}
                                        </span>
                                    </td>

                                    {/* Joined Date Column */}
                                    <td className="hidden sm:table-cell px-4 md:px-8 py-4 md:py-6 text-xs md:text-sm text-gray-500 whitespace-nowrap">
                                        {formatReadableDate(u.createdAt)}
                                    </td>

                                    {/* Interactive Action Buttons */}
                                    <td className="px-4 md:px-8 py-4 md:py-6 text-right whitespace-nowrap">
                                        <div className="flex items-center justify-end gap-1 md:gap-2">
                                            {/* Role Switcher Button */}
                                            <RoleSwitcherButton user={u} setupdateOccured={setUpdateOccurred} updateOccured={updateOccured} />


                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </motion.div>
    )
}

export default UsersTab