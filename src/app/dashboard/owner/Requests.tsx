"use client";

import React, { useEffect, useState } from 'react';
import { Check, X as CloseIcon, Calendar, Phone, MessageSquare, AlertCircle, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';
import { authClient } from '@/lib/auth-client';
import { toast } from 'react-toastify';

interface BookingRequestItem {
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

const Requests = () => {
    const [requests, setRequests] = useState<BookingRequestItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [updateOccured, setUpdateOccurred] = useState(1);

    // Tracks which specific booking ID is currently being processed (approved/declined)
    const [processingId, setProcessingId] = useState<string | null>(null);

    useEffect(() => {
        const fetchIncomingRequests = async () => {
            try {
                setLoading(true);
                setError(null);

                const session = await authClient.getSession();
                const ownerId = (session as any)?.data?.user?.id;

                if (!ownerId) {
                    throw new Error("Authorization credentials missing");
                }

                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/booking/getbookingbyownnerid/${ownerId}`, {
                    cache: 'no-store'
                });

                if (!response.ok) {
                    throw new Error("Failed to pull system inquiries");
                }

                const result = await response.json();
                console.log('booking request: ', result)

                const dataArray = result.data || [];


                setRequests(dataArray);
            } catch (err: any) {
                setError(err.message || "An error occurred fetching booking inquiries");
            } finally {
                setLoading(false);
            }
        };

        fetchIncomingRequests();
    }, []);

    const handleApprove = async (bookingId: string) => {
        if (processingId) return; // Prevent double actions
        try {
            setProcessingId(bookingId);

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/booking/updatebooking/${bookingId}/approved`,
                { method: 'PATCH' }
            );

            if (!response.ok) {
                throw new Error("Failed to approve booking request");
            }
            setUpdateOccurred(updateOccured + 1);

            toast.success("Booking request approved successfully!");

        } catch (err: any) {
            toast.error(err.message || "An error occurred while approving the request");
        } finally {
            setProcessingId(null);
        }
    };

    const handleDecline = async (bookingId: string) => {
        if (processingId) return; // Prevent double actions
        try {
            setProcessingId(bookingId);

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/booking/updatebooking/${bookingId}/rejected`,
                { method: 'PATCH' }
            );

            if (!response.ok) {
                throw new Error("Failed to decline booking request");
            }

            setUpdateOccurred(updateOccured + 1);
            toast.info("Booking request declined.");

        } catch (err: any) {
            toast.error(err.message || "An error occurred while declining the request");
        } finally {
            setProcessingId(null);
        }
    };

    if (loading) {
        return (
            <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-20 text-center border border-gray-100 dark:border-gray-800 flex flex-col items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
                <p className="text-gray-500 text-sm font-medium">Retrieving fresh booking inquiries...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-20 text-center border border-gray-100 dark:border-gray-800 min-h-[400px] flex flex-col items-center justify-center">
                <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Inquiry Load Failure</h3>
                <p className="text-gray-500 text-sm mt-1 max-w-xs">{error}</p>
            </div>
        );
    }

    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div>
                <h3 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">New Booking Inquiries</h3>
                <p className="text-sm text-gray-500 mt-1">Review pending occupant proposals and transaction allocations.</p>
            </div>

            {requests.length === 0 ? (
                <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-20 text-center border border-gray-100 dark:border-gray-800 flex flex-col items-center justify-center min-h-[300px] space-y-4">
                    <div className="w-16 h-16 bg-gray-50 dark:bg-gray-800 rounded-2xl flex items-center justify-center">
                        <ShoppingBag className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Inquiry Queue Empty</h3>
                    <p className="text-gray-500 text-sm max-w-xs">You don't have any pending tenant requests awaiting validation at this time.</p>
                </div>
            ) :
                // <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm">
                //     <div className="overflow-x-auto">
                //         <table className="w-full text-left border-collapse min-w-[800px]">
                //             <thead>
                //                 <tr className="bg-gray-50/70 dark:bg-gray-800/40 border-b border-gray-100 dark:border-gray-800">
                //                     <th className="px-8 py-5 text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">Applicant Tenant</th>
                //                     <th className="px-8 py-5 text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">Target Property</th>
                //                     <th className="px-8 py-5 text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">Paid Amount</th>
                //                     <th className="px-8 py-5 text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">Status</th>
                //                     <th className="px-8 py-5 text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest text-right">Decisions</th>
                //                 </tr>
                //             </thead>
                //             <tbody className="divide-y divide-gray-100 dark:divide-gray-800/60">
                //                 {requests.map((req) => (
                //                     <tr key={req._id} className="hover:bg-gray-50/30 dark:hover:bg-gray-800/10 transition-colors group">
                //                         {/* Tenant Column */}
                //                         <td className="px-8 py-6">
                //                             <div className="flex items-center gap-4">
                //                                 <div className="w-11 h-11 bg-gradient-to-tr from-blue-600 to-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-base shadow-sm">
                //                                     {req.userName ? req.userName[0].toUpperCase() : 'U'}
                //                                 </div>
                //                                 <div className="space-y-0.5">
                //                                     <p className="font-bold text-gray-900 dark:text-white text-base">{req.userName}</p>
                //                                     <p className="text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1">
                //                                         <Phone className="w-3 h-3" /> {req.contactNumber}
                //                                     </p>
                //                                 </div>
                //                             </div>
                //                         </td>

                //                         {/* Property & Booking Info Column */}
                //                         <td className="px-8 py-6">
                //                             <div className="space-y-1">
                //                                 <p className="font-bold text-gray-800 dark:text-gray-200 text-sm max-w-xs truncate">{req.propertyTitle}</p>
                //                                 <div className="flex items-center gap-3 text-xs font-medium text-gray-400">
                //                                     <span className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                //                                         <Calendar className="w-3.5 h-3.5" /> Move-in: {new Date(req.moveInDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                //                                     </span>
                //                                 </div>
                //                                 {req.notes && (
                //                                     <p className="text-xs text-gray-400 italic flex items-start gap-1 bg-gray-50 dark:bg-gray-800/40 p-1.5 rounded-lg border border-gray-100 dark:border-gray-800 max-w-xs mt-1">
                //                                         <MessageSquare className="w-3 h-3 mt-0.5 flex-shrink-0 text-gray-400" /> "{req.notes}"
                //                                     </p>
                //                                 )}
                //                             </div>
                //                         </td>

                //                         {/* Revenue Amount Column */}
                //                         <td className="px-8 py-6">
                //                             <div className="space-y-0.5">
                //                                 <p className="font-extrabold text-blue-600 dark:text-blue-400 text-lg">${req.amountPaid.toLocaleString()}</p>
                //                                 <p className="text-[10px] font-mono font-medium text-gray-400 truncate w-28" title={req.stripePaymentId}>
                //                                     {req.stripePaymentId ? `${req.stripePaymentId.slice(0, 8)}...` : 'No Escrow ID'}
                //                                 </p>
                //                             </div>
                //                         </td>

                //                         {/* status */}
                //                         <td className="px-8 py-6">
                //                             <div className="space-y-0.5">
                //                                 <p className="font-extrabold text-blue-600 dark:text-blue-400 text-lg">
                //                                     {req.status}
                //                                 </p>
                //                             </div>
                //                         </td>

                //                         {/* Action CTA Buttons */}
                //                         <td className="px-8 py-6 text-right">
                //                             <div className="flex justify-end gap-2.5 min-w-[100px]">
                //                                 {processingId === req._id ? (
                //                                     <div className="px-4 py-2 flex items-center justify-center">
                //                                         <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                //                                     </div>
                //                                 ) : (
                //                                     <>
                //                                         <button
                //                                             onClick={() => handleApprove(req._id)}
                //                                             disabled={processingId !== null}
                //                                             title="Accept Request"
                //                                             className="bg-green-600 hover:bg-green-700 text-white p-2.5 rounded-xl transition-all shadow-md shadow-green-600/10 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                //                                         >
                //                                             <Check className="w-4 h-4 stroke-[3]" />
                //                                         </button>
                //                                         <button
                //                                             onClick={() => handleDecline(req._id)}
                //                                             disabled={processingId !== null}
                //                                             title="Decline Request"
                //                                             className="bg-red-50 hover:bg-red-600 text-red-600 hover:text-white dark:bg-red-950/20 dark:text-red-400 dark:hover:bg-red-600 dark:hover:text-white p-2.5 rounded-xl transition-all border border-red-100 dark:border-red-900/50 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                //                                         >
                //                                             <CloseIcon className="w-4 h-4 stroke-[3]" />
                //                                         </button>
                //                                     </>
                //                                 )}
                //                             </div>
                //                         </td>
                //                     </tr>
                //                 ))}
                //             </tbody>
                //         </table>
                //     </div>
                // </div>

                
                    requests.map((req) => (
                        <div key={req._id} className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800/80 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
                            {/* Upper Content Layer */}
                            <div className="space-y-4">
                                {/* Tenant Identity Header */}
                                <div className="flex items-center gap-3.5 pb-3 border-b border-gray-50 dark:border-gray-800/60">
                                    <div className="w-12 h-12 bg-gradient-to-tr from-blue-600 to-indigo-600 text-white rounded-2xl flex items-center justify-center font-bold text-lg shadow-sm flex-shrink-0">
                                        {req.userName ? req.userName[0].toUpperCase() : 'U'}
                                    </div>
                                    <div className="overflow-hidden">
                                        <p className="font-bold text-gray-900 dark:text-white text-base truncate">{req.userName}</p>
                                        <p className="text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1 mt-0.5">
                                            <Phone className="w-3 h-3 flex-shrink-0" /> {req.contactNumber}
                                        </p>
                                    </div>
                                </div>

                                {/* Property Information */}
                                <div className="space-y-2">
                                    <div>
                                        <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider bg-blue-50 dark:bg-blue-950/40 px-2 py-0.5 rounded-md">
                                            Target Property
                                        </span>
                                        <h4 className="font-extrabold text-gray-800 dark:text-gray-200 text-base mt-1 line-clamp-1 group-hover:text-blue-600 transition-colors">
                                            {req.propertyTitle}
                                        </h4>
                                    </div>

                                    {/* Timeline Date */}
                                    <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 dark:text-gray-400">
                                        <Calendar className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                        <span>Move-in: {new Date(req.moveInDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                    </div>

                                    {/* Optional Tenant Notes */}
                                    {req.notes && (
                                        <div className="text-xs text-gray-500 dark:text-gray-400 italic flex items-start gap-1.5 bg-gray-50 dark:bg-gray-800/40 p-2.5 rounded-xl border border-gray-100 dark:border-gray-800/60">
                                            <MessageSquare className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-gray-400" />
                                            <span className="line-clamp-2">"{req.notes}"</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Lower Section (Financials & Actions) */}
                            <div className="mt-5 pt-4 border-t border-gray-50 dark:border-gray-800/60 space-y-4">
                                <div className="flex items-center justify-between">
                                    {/* Payment Info */}
                                    <div>
                                        <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Paid Amount</p>
                                        <p className="font-black text-gray-900 dark:text-white text-xl mt-0.5">${req.amountPaid.toLocaleString()}</p>
                                    </div>

                                    {/* Status / Escrow Info */}
                                    <div className="text-right">
                                        <span className="inline-block text-[10px] font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30 px-2 py-1 rounded-lg border border-amber-100 dark:border-amber-900/30 capitalize">
                                            {req.status}
                                        </span>
                                        <p className="text-[9px] font-mono font-medium text-gray-400 mt-1 truncate w-24" title={req.stripePaymentId}>
                                            {req.stripePaymentId || 'No Escrow ID'}
                                        </p>
                                    </div>
                                </div>

                                {/* Action Controls Section */}
                                <div className="w-full pt-1">
                                    {processingId === req._id ? (
                                        <div className="py-2.5 flex items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700/50">
                                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-2 gap-3">
                                            <button
                                                onClick={() => handleDecline(req._id)}
                                                disabled={processingId !== null}
                                                className={`bg-gray-50 hover:bg-red-50 dark:bg-gray-800/60 dark:hover:bg-red-950/30 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 py-2.5 rounded-xl transition-all border border-gray-100 dark:border-gray-700/50 font-bold text-xs flex items-center justify-center gap-1.5 active:scale-95 disabled:opacity-50 ${req.status === 'rejected' ? 'hidden' : ''}`}
                                            >
                                                <CloseIcon className="w-3.5 h-3.5 stroke-[2.5]" /> Decline
                                            </button>
                                            <button
                                                onClick={() => handleApprove(req._id)}
                                                disabled={processingId !== null}
                                                className={`bg-gray-50 hover:bg-red-50 dark:bg-gray-800/60 dark:hover:bg-red-950/30 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 py-2.5 rounded-xl transition-all border border-gray-100 dark:border-gray-700/50 font-bold text-xs flex items-center justify-center gap-1.5 active:scale-95 disabled:opacity-50 ${(req.status === 'approved' || req.status === 'rejected') ? 'hidden' : ''}`}
                                            >
                                                <Check className="w-3.5 h-3.5 stroke-[2.5]" /> Approve
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                
            }
        </motion.div>
    );
};

export default Requests;