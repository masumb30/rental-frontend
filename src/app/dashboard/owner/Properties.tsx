"use client";

import React, { useEffect, useState } from 'react';
import {
    PlusCircle, Trash2, Edit3, Eye, 
    MapPin, BedDouble, Bath, Maximize2, AlertCircle
} from 'lucide-react';
import { motion } from 'framer-motion';
import { authClient } from '@/lib/auth-client';

interface PropertyOwnerInfo {
    name: string;
    id: string;
}

interface PropertyItem {
    _id: string;
    title: string;
    description: string;
    location: string;
    type: string;
    price: number;
    rentCycle: string;
    beds: number;
    baths: number;
    size: number;
    amenities: string[];
    images: string[];
    extraFeatures: string[];
    status: 'approved' | 'rejected' | 'pending' | string;
    ownerInfo: PropertyOwnerInfo;
    rejectionReason?: string;
    createdAt: string;
    updatedAt: string;
}

interface PropertiesProps {
    setCurrentFeedback: (feedback: string) => void;
    setShowRejectionModal: (show: boolean) => void;
}

const Properties = ({ setCurrentFeedback, setShowRejectionModal }: PropertiesProps) => {
    const [properties, setProperties] = useState<PropertyItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchOwnerProperties = async () => {
            try {
                setLoading(true);
                setError(null);
                
                const session = await authClient.getSession();
                const userId = (session as any)?.data?.user?.id;
                
                if (!userId) {
                    throw new Error("User authorization token required");
                }

                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_BACKEND_URL}/properties/getPropertiesByOwnerId/${userId}`, 
                    { cache: 'no-store' }
                );
    
                if (!response.ok) {
                    throw new Error('Failed to fetch platform properties');
                }
    
                const result = await response.json();
                console.log("Fetched properties:", result);
                // Ensure array assignment matching data envelopes
                setProperties(result.data || result || []);
            } catch (err: any) {
                setError(err.message || "Failed loading portfolio records");
            } finally {
                setLoading(false);
            }
        };
    
        fetchOwnerProperties();
    }, []);

    // Color mapper based on your object's status field string
    const getStatusBadge = (status: string) => {
        switch (status?.toLowerCase()) {
            case 'approved':
                return 'bg-green-50 text-green-600 dark:bg-green-950/30 dark:text-green-400 border-green-100 dark:border-green-900/50';
            case 'rejected':
                return 'bg-red-50 text-red-600 dark:bg-red-950/30 dark:text-red-400 border-red-100 dark:border-red-900/50';
            default:
                return 'bg-blue-50 text-blue-600 dark:bg-blue-950/30 dark:text-blue-400 border-blue-100 dark:border-blue-900/50';
        }
    };

    if (loading) {
        return (
            <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-20 text-center border border-gray-100 dark:border-gray-800 flex flex-col items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
                <p className="text-gray-500 text-sm font-medium">Assembling your property list...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-20 text-center border border-gray-100 dark:border-gray-800 min-h-[400px] flex flex-col items-center justify-center">
                <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Portfolio Sync Failure</h3>
                <p className="text-gray-500 text-sm mt-1 max-w-xs">{error}</p>
            </div>
        );
    }

    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            {/* Header Title Layer */}
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-2">
                <div>
                    <h3 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">Manage My Properties</h3>
                    <p className="text-sm text-gray-500 mt-1">Review, monitor, and handle your active real estate assets.</p>
                </div>
                <button className="bg-blue-600 text-white px-6 py-3 rounded-2xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-blue-700 shadow-md shadow-blue-500/10 transition-all self-start sm:self-auto active:scale-95">
                    <PlusCircle className="w-4 h-4" /> Add New Listing
                </button>
            </div>

            {/* Properties Registry Container */}
            {properties.length === 0 ? (
                <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-20 text-center border border-gray-100 dark:border-gray-800 flex flex-col items-center justify-center space-y-3">
                    <p className="text-gray-500 font-medium">You haven't added any listings to the platform yet.</p>
                </div>
            ) : (
                <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-[700px]">
                            <thead>
                                <tr className="bg-gray-50/70 dark:bg-gray-800/40 border-b border-gray-100 dark:border-gray-800">
                                    <th className="px-8 py-5 text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">Property Details</th>
                                    <th className="px-8 py-5 text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest w-32">Status</th>
                                    <th className="px-8 py-5 text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest text-right w-44">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-gray-800/60">
                                {properties.map((p) => (
                                    <tr key={p._id} className="hover:bg-gray-50/40 dark:hover:bg-gray-800/20 transition-colors group">
                                        {/* Main Media Info Cell */}
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-5">
                                                <div className="w-20 h-20 rounded-2xl bg-gray-100 dark:bg-gray-800 overflow-hidden flex-shrink-0 border border-gray-100 dark:border-gray-800">
                                                    {p.images && p.images.length > 0 ? (
                                                        <img src={p.images[0]} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-gray-400 font-bold text-xs uppercase">No Image</div>
                                                    )}
                                                </div>
                                                <div className="space-y-1">
                                                    <h4 className="font-bold text-base text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">{p.title}</h4>
                                                    <p className="text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1">
                                                        <MapPin className="w-3.5 h-3.5 flex-shrink-0 text-gray-400" /> {p.location}
                                                    </p>
                                                    {/* Blueprint Metrics Row */}
                                                    <div className="flex items-center gap-4 text-xs text-gray-500 font-medium pt-1">
                                                        <span className="flex items-center gap-1"><BedDouble className="w-3.5 h-3.5 text-gray-400" /> {p.beds} Beds</span>
                                                        <span className="flex items-center gap-1"><Bath className="w-3.5 h-3.5 text-gray-400" /> {p.baths} Baths</span>
                                                        <span className="flex items-center gap-1"><Maximize2 className="w-3.5 h-3.5 text-gray-400" /> {p.size} sqft</span>
                                                        <span className="text-blue-600 font-bold dark:text-blue-400">${p.price} / {p.rentCycle}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Status Cell */}
                                        <td className="px-8 py-6 whitespace-nowrap">
                                            <span className={`px-3 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-wider border ${getStatusBadge(p.status)}`}>
                                                {p.status}
                                            </span>
                                        </td>

                                        {/* Context Actions Cell */}
                                        <td className="px-8 py-6 text-right whitespace-nowrap">
                                            <div className="flex justify-end gap-2.5 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                                {p.status?.toLowerCase() === 'rejected' && (
                                                    <button
                                                        onClick={() => { 
                                                            setCurrentFeedback(p.rejectionReason || "No feedback summary recorded."); 
                                                            setShowRejectionModal(true); 
                                                        }}
                                                        title="View Rejection Reason"
                                                        className="text-gray-400 hover:text-blue-600 p-2.5 bg-gray-50 dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-blue-950/40 rounded-xl border border-gray-100 dark:border-gray-700/50 transition-colors"
                                                    >
                                                        <Eye className="w-4 h-4" />
                                                    </button>
                                                )}
                                                <button title="Edit Listing" className="text-gray-400 hover:text-amber-600 p-2.5 bg-gray-50 dark:bg-gray-800 hover:bg-amber-50 dark:hover:bg-amber-950/40 rounded-xl border border-gray-100 dark:border-gray-700/50 transition-colors">
                                                    <Edit3 className="w-4 h-4" />
                                                </button>
                                                <button title="Remove Listing" className="text-gray-400 hover:text-red-600 p-2.5 bg-gray-50 dark:bg-gray-800 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-xl border border-gray-100 dark:border-gray-700/50 transition-colors">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </motion.div>
    );
};

export default Properties;