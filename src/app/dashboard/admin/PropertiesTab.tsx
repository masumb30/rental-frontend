"use client";

import React, { useState } from 'react';
import {
    Users, Building, ShoppingBag, CreditCard,
    Search, Shield, Check, X as CloseIcon,
    MessageSquare, MoreHorizontal, ChevronRight,
    UserPlus, CheckCircle2, AlertTriangle, Filter,
    Trash
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import { authClient } from '@/lib/auth-client';

const PropertiesTab = () => {
    const [currentPropertyId, setCurrentPropertyId] = useState<string | null>(null);
    const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);

    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [updateOccured, setUpdateOccurred] = useState(1);

    React.useEffect(() => {
        const fetchProperties = async () => {
            try {
                setLoading(true);
                // Replace with your actual API endpoint URL
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/properties`, { cache: 'no-store' });

                if (!response.ok) {
                    throw new Error('Failed to fetch platform properties');
                }

                const data = await response.json();
                console.log("Fetched properties:", data);
                setProperties(data.data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProperties();
    }, [updateOccured]);
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
    const handleDelete = async (id: string) => {
        try {
            setIsRejectModalOpen(false);
            const session = await authClient.getSession();
            const token = session?.data?.session?.token;

            if (!token) {
                console.error("🔒 Unauthorized: No Better Auth session found.");
                toast.error("🔒 Unauthorized: Please log in to delete a property.");
                return;
            }
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/properties/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });

            if (!response.ok) {
                throw new Error('Failed to delete property');
            }

            // Success feedback
            toast.success(`Successfully deleted property with ID: ${id}!`);
            setUpdateOccurred(updateOccured + 1);
        } catch (error: any) {
            console.error("❌ Delete error:", error);
            toast.error(error.message || "Failed to delete property. Please try again.");
        }
    };
    const handleReject = async (id: string) => {
        try {
            setIsRejectModalOpen(false);
            const session = await authClient.getSession();
            const token = session?.data?.session?.token;

            if (!token) {
                console.error("🔒 Unauthorized: No Better Auth session found.");
                toast.error("🔒 Unauthorized: Please log in to delete a property.");
                return;
            }
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/properties/${id}/reject`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });

            if (!response.ok) {
                throw new Error('Failed to reject property');
            }

            // Success feedback
            toast.success(`Successfully rejected property with ID: ${id}!`);
            setUpdateOccurred(updateOccured + 1);
        } catch (error: any) {
            console.error("❌ Reject error:", error);
            toast.error(error.message || "Failed to reject property. Please try again.");
        }
    };
    const handleApprove = async (id: string) => {
        try {
            setIsRejectModalOpen(false);
            const session = await authClient.getSession();
            const token = session?.data?.session?.token;

            if (!token) {
                console.error("🔒 Unauthorized: No Better Auth session found.");
                toast.error("🔒 Unauthorized: Please log in to Approve a property.");
                return;
            }
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/properties/${id}/approve`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });

            if (!response.ok) {
                throw new Error('Failed to approve property');
            }

            // Success feedback
            toast.success(`Successfully approved property with ID: ${id}!`);
            setUpdateOccurred(updateOccured + 1);
        } catch (error: any) {
            console.error("❌ Approve error:", error);
            toast.error(error.message || "Failed to approve property. Please try again.");
        }
    };
    return (
        <>
            <ToastContainer autoClose={1500} position="top-right" theme="dark" />
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <h3 className="text-2xl text-gray-200">Property Approval Queue</h3>
                <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50/80 dark:bg-gray-800/50">
                                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Property & Owner</th>
                                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest hidden md:table-cell">Submitted</th>
                                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                            {properties.map((p: any) => (
                                <tr key={p._id} className="hover:bg-gray-50/10 cursor-pointer  transition-colors">
                                    <td className="px-8 py-6">
                                        <div>
                                            <p className="font-black text-gray-300 dark:text-white">{p.title}</p>
                                            <p className="text-gray-200 text-sm">{p.location}</p>
                                            <p className="text-xs text-gray-400 italic">Owner: {p.ownerInfo.name}</p>
                                        </div>
                                    </td>
                                    <td className="px-8 hidden md:table-cell py-6 text-sm text-gray-500 font-medium">Added On:<br /> {formatReadableDate(p.createdAt)}</td>
                                    <td className="px-8 py-6 text-sm text-gray-500 font-medium">{p.status}</td>
                                    <td className="px-8 py-6 text-right">

                                        <div className="flex justify-end gap-2">
                                            {
                                                p.status.toLowerCase() === 'pending' || p.status.toLowerCase() === 'rejected' &&

                                                <button onClick={() => handleApprove(p._id)} className="bg-green-600 text-white p-2.5 rounded-xl hover:bg-green-700 shadow-lg shadow-green-500/20 active:scale-95 transition-all"><Check className="w-5 h-5" /></button>
                                            }
                                            {
                                                p.status.toLowerCase() === 'pending' || p.status.toLowerCase() === 'approved' &&
                                                <button
                                                onClick={() => { setIsRejectModalOpen(true); setCurrentPropertyId(p._id) }}
                                                className="bg-red-50 text-red-600 p-2.5 rounded-xl hover:bg-red-600 hover:text-white transition-all active:scale-95"
                                                >
                                                <CloseIcon className="w-5 h-5" />
                                            </button>
                                            }

                                            <button onClick={() => handleDelete(p._id)} className="bg-red-600 text-white p-2.5 rounded-xl hover:bg-red-700 shadow-lg shadow-green-500/20 active:scale-95 transition-all"><Trash className="w-5 h-5" /></button>
                                        </div>



                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>


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
                                    <button onClick={() => { setIsRejectModalOpen(false); handleReject(currentPropertyId as string) }} className="flex-[2] bg-red-600 text-white py-4 rounded-2xl font-bold hover:bg-red-700 transition-all shadow-xl shadow-red-500/20">Confirm Rejection</button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    )
}


export default PropertiesTab;