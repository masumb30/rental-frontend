"use client";

import React, { useState } from 'react';
import {
    ShoppingBag, Heart, User, Calendar, MapPin,
    Trash2, ExternalLink, ChevronRight, LayoutDashboard,
    Clock, CheckCircle2, AlertCircle
} from 'lucide-react';
import { motion } from 'framer-motion';
import { authClient } from '@/lib/auth-client';
export interface Booking {
  _id: string;
  amountPaid: number;
  contactNumber: string;
  createdAt: string; // ISO Date String
  moveInDate: string; // YYYY-MM-DD format
  notes: string;
  propertyId: string;
  propertyOwner: string;
  propertyOwnerId: string;
  stripePaymentId: string;
  updatedAt: string; // ISO Date String
  userId: string;
  userName: string;
  propertyTitle: string;
  status: string;
}

const BookingTab = () => {
    const [loading, setLoading] = useState(true);
    const [bookings, setBookings] = useState([]);
    const [error, setError] = useState(null);
    const [updateOccured, setUpdateOccurred] = useState(1);
    
    React.useEffect(() => {
            const fetchBookings = async () => {
                try {
                    const session = await authClient.getSession();
                    console.log("Session: ", session);
                    const userId = (session as any)?.data?.user?.id;
                    setLoading(true);
                    // Replace with your actual API endpoint URL
                    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/booking/getbookingforuser/${userId}`, { cache: 'no-store' });
    
                    if (!response.ok) {
                        throw new Error('Failed to fetch platform properties');
                    }
    
                    const data = await response.json();
                    console.log("Fetched properties:", data);
                    setBookings(data.data);
                } catch (err: any) {
                    setError(err.message);
                } finally {
                    setLoading(false);
                }
            };
    
            fetchBookings();
        }, [updateOccured]);

    return (
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
                            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Move in Date</th>
                            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Amount</th>
                            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                        {bookings.map((booking:Booking) => (
                            <tr key={booking._id} className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                                <td className="px-6 py-6 font-bold">{booking.propertyTitle}</td>
                                <td className="px-6 py-6 text-gray-500 text-sm">{booking.moveInDate}</td>
                                <td className="px-6 py-6 font-bold">${booking.amountPaid}</td>
                                <td className="px-6 py-6">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${booking.status === 'Confirmed' ? 'bg-green-100 text-green-600' :
                                        booking.status === 'Pending' ? 'bg-amber-100 text-amber-600' : 'bg-blue-100 text-blue-600'
                                        }`}>
                                        {booking.status}
                                    </span>
                                </td>
                                
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </motion.div>
    )
}

export default BookingTab