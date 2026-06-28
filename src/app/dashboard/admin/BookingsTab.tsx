"use client";

import React, { useState, useEffect } from 'react';
import {
    ShoppingBag, CreditCard, Calendar, User, 
    Building, ArrowRight, ShieldCheck, HelpCircle, 
    CheckCircle2, Clock, XCircle, Hash
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { authClient } from '@/lib/auth-client';

interface BookingItem {
    _id: string;
    userId: string;
    userName: string;
    propertyOwner: string;
    propertyOwnerId: string;
    propertyId: string;
    propertyTitle: string;
    moveInDate: string;
    contactNumber: string;
    notes: string;
    stripePaymentId: string;
    amountPaid: number;
    status: 'pending' | 'confirmed' | 'cancelled' | string;
    createdAt: string;
    updatedAt: string;
}

const BookingsTab = ({ activeTab }: { activeTab: string }) => {
    const [bookings, setBookings] = useState<BookingItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const { data: sessionData } = authClient.useSession();
    const currentUserId = sessionData?.user?.id;

    useEffect(() => {
        const fetchAllBookings = async () => {
            try {
                setLoading(true);
                setError(null);
                
                // Adjust endpoint string matching your setup structure
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/booking/allbooking`);
                
                if (!response.ok) {
                    throw new Error("Failed to fetch system logs");
                }
                const data = await response.json(); 
                setBookings(data || []);
            } catch (err: any) {
                setError(err.message || "Something went wrong fetching records");
            } finally {
                setLoading(false);
            }
        };

        fetchAllBookings();
    }, []);

    // Status Helper Style Mapper
    const getStatusStyles = (status: string) => {
        switch (status?.toLowerCase()) {
            case 'confirmed':
                return { bg: 'bg-green-50 dark:bg-green-950/30', text: 'text-green-600 dark:text-green-400', icon: CheckCircle2 };
            case 'pending':
                return { bg: 'bg-amber-50 dark:bg-amber-950/30', text: 'text-amber-600 dark:text-amber-400', icon: Clock };
            default:
                return { bg: 'bg-gray-50 dark:bg-gray-800', text: 'text-gray-500', icon: XCircle };
        }
    };

    if (loading) {
        return (
            <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-20 text-center border border-gray-100 dark:border-gray-800 flex flex-col items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
                <p className="text-gray-500 text-sm font-medium">Aggregating platform ledger statistics...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-20 text-center border border-gray-100 dark:border-gray-800 min-h-[400px] flex flex-col items-center justify-center">
                <XCircle className="w-12 h-12 text-red-500 mb-4" />
                <h3 className="text-xl font-bold">Failed to load content</h3>
                <p className="text-gray-500 text-sm mt-1 max-w-xs">{error}</p>
            </div>
        );
    }

    if (bookings.length === 0) {
        return (
            <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-20 text-center border border-gray-100 dark:border-gray-800 min-h-[400px] flex flex-col items-center justify-center space-y-4">
                <div className="w-16 h-16 bg-gray-50 dark:bg-gray-800 rounded-2xl flex items-center justify-center">
                    <ShoppingBag className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-bold">No Records Found</h3>
                <p className="text-gray-500 text-sm max-w-xs">There are currently no transactional or booking entities active on the network.</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <AnimatePresence mode="wait">
                {activeTab === 'bookings' ? (
                    <motion.div
                        key="bookings-list"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        transition={{ duration: 0.25 }}
                        className="space-y-4"
                    >
                        {bookings.map((item) => {
                            const status = getStatusStyles(item.status);
                            return (
                                <div key={item._id} className="bg-white dark:bg-gray-900 p-6 md:p-8 rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-gray-200 dark:hover:border-gray-700 transition-all group">
                                    <div className="space-y-4 flex-1">
                                        {/* Property info Header */}
                                        <div className="flex flex-wrap items-center gap-3">
                                            <div className="p-2.5 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 rounded-xl">
                                                <Building className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">{item.propertyTitle}</h4>
                                                <p className="text-xs text-gray-400 dark:text-gray-500 font-mono mt-0.5">ID: {item.propertyId}</p>
                                            </div>
                                        </div>

                                        {/* Actor Relationship Grid */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-gray-50 dark:border-gray-800/60">
                                            <div className="flex items-center gap-2.5 text-sm">
                                                <User className="w-4 h-4 text-gray-400" />
                                                <span className="text-gray-400">Tenant:</span>
                                                <span className="font-semibold text-gray-700 dark:text-gray-300">
                                                    {item.userName} {item.userId === currentUserId && <span className="text-[10px] bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 px-1.5 py-0.5 rounded font-bold uppercase ml-1">You</span>}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2.5 text-sm">
                                                <ShieldCheck className="w-4 h-4 text-gray-400" />
                                                <span className="text-gray-400">Host:</span>
                                                <span className="font-semibold text-gray-700 dark:text-gray-300">
                                                    {item.propertyOwner} {item.propertyOwnerId === currentUserId && <span className="text-[10px] bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400 px-1.5 py-0.5 rounded font-bold uppercase ml-1">You</span>}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* System Parameters & Status */}
                                    <div className="flex md:flex-col items-center md:items-end justify-between md:justify-center gap-4 pt-4 md:pt-0 border-t md:border-t-0 border-gray-100 dark:border-gray-800">
                                        <div className="text-left md:text-right">
                                            <span className="text-xs text-gray-400 uppercase tracking-wider font-bold block">Move In Date</span>
                                            <div className="flex items-center md:justify-end gap-1.5 text-gray-800 dark:text-gray-200 font-bold mt-1">
                                                <Calendar className="w-4 h-4 text-gray-400" />
                                                {new Date(item.moveInDate).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                                            </div>
                                        </div>

                                        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold capitalize ${status.bg} ${status.text}`}>
                                            <status.icon className="w-3.5 h-3.5" />
                                            {item.status}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </motion.div>
                ) : (
                    <motion.div
                        key="transactions-ledger"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        transition={{ duration: 0.25 }}
                        className="space-y-4"
                    >
                        {bookings.map((item) => (
                            <div key={`tx-${item._id}`} className="bg-white dark:bg-gray-900 p-6 rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:shadow-md transition-all">
                                <div className="flex items-start gap-4">
                                    <div className="p-3.5 bg-green-50 dark:bg-green-950/20 text-green-600 dark:text-green-400 rounded-2xl hidden sm:block">
                                        <CreditCard className="w-5 h-5" />
                                    </div>
                                    <div className="space-y-1">
                                        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                                            <span className="font-bold text-gray-800 dark:text-gray-200">{item.userName}</span>
                                            <ArrowRight className="w-3.5 h-3.5 text-gray-400" />
                                            <span className="font-semibold text-gray-600 dark:text-gray-400">{item.propertyOwner}</span>
                                        </div>
                                        <p className="text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1 font-medium">
                                            <Hash className="w-3 h-3" /> {item.stripePaymentId || 'N/A'}
                                        </p>
                                        <p className="text-[11px] text-gray-400 font-medium">
                                            Settled: {new Date(item.createdAt).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })}
                                        </p>
                                    </div>
                                </div>

                                <div className="sm:text-right flex sm:flex-col items-center sm:items-end justify-between gap-1.5 pt-3 sm:pt-0 border-t sm:border-t-0 border-gray-50 dark:border-gray-800">
                                    <span className="text-xl font-extrabold text-blue-600 dark:text-blue-400">
                                        ${item.amountPaid?.toLocaleString()}
                                    </span>
                                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 rounded">
                                        Stripe Core
                                    </span>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default BookingsTab;