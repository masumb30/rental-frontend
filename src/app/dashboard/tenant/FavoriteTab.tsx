"use client";

import React, { useState, useEffect } from 'react';
import { MapPin, Trash2, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { authClient } from '@/lib/auth-client';

const FavoriteTab = () => {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [userId, setUserId] = useState(null);

    // 1. First useEffect: Get the authenticated user's ID
    useEffect(() => {
        const getUserSession = async () => {
            try {
                const session = await authClient.getSession();
                const id = (session as any)?.data?.user?.id;
                if (id) {
                    setUserId(id);
                } else {
                    setError("User session not found");
                    setLoading(false);
                }
            } catch (err) {
                console.error("Session error:", err);
                setError("Failed to authenticate user");
                setLoading(false);
            }
        };
        getUserSession();
    }, []);

    // 2. Second useEffect: Runs ONLY when userId is successfully set
    useEffect(() => {
        if (!userId) return; // Now this safely acts as a gatekeeper

        const fetchFavorites = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/properties/getfavorites/${userId}`);

                if (!response.ok) {
                    if (response.status === 404) {
                        setFavorites([]);
                        return;
                    }
                    throw new Error("Failed to fetch favorites");
                }

                const result = await response.json();
                console.log('favorite result: ', result);
                setFavorites(result.data?.propertyId || []);
            } catch (err: any) {
                setError(err.message || "Something went wrong");
            } finally {
                setLoading(false);
            }
        };

        fetchFavorites();
    }, [userId]); // Crucial: Re-runs the hook as soon as userId changes from null to a string


    // Render states to handle loading and errors UI-side
    if (loading) return <div className="text-center py-6">Loading favorites...</div>;
    if (error) return <div className="text-center py-6 text-red-500">Error: {error}</div>;
    if (favorites.length === 0) return <div className="text-center py-6 text-gray-500">No favorites found.</div>;

    return (
        <motion.div 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
            {favorites.map((item: any) => (
                <div key={item._id} className="bg-white dark:bg-gray-900 p-4 rounded-3xl border border-gray-100 dark:border-gray-800 flex gap-4 group">
                    <img src={item.images[0]} className="w-24 h-24 rounded-2xl object-cover" alt="" />
                    <div className="flex-1 flex flex-col justify-between py-1">
                        <div>
                            <h4 className="font-bold">{item.title}</h4>
                            <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                                <MapPin className="w-3 h-3" /> {item.location}
                            </p>
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
    );
};

export default FavoriteTab;