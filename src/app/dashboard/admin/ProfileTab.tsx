"use client";

import React from 'react';
import { MapPin, User, Mail, Shield, ShieldAlert } from 'lucide-react';
import { motion } from 'framer-motion';
import { authClient } from '@/lib/auth-client';

const ProfileTab = () => {
    // Fetch live session data using the hook
    const session = authClient.useSession();
    console.log('user session from profile page: ', session);

    const { data, isPending } = session;
    const userData = data?.user;

    // 1. Handle Loading State
    if (isPending) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    // 2. Handle Unauthenticated State
    if (!userData) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] text-center space-y-3">
                <ShieldAlert className="w-12 h-12 text-amber-500" />
                <h3 className="text-xl font-bold">Not Logged In</h3>
                <p className="text-gray-500 max-w-xs">Please log in to view and manage your profile settings.</p>
            </div>
        );
    }

    // Helper to get initials from the user's name if they don't have an avatar image
    const getInitials = (name: string) => {
        if (!name) return "U";
        return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
    };

    return (
        <motion.div 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 p-10 space-y-10 shadow-sm"
        >
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                {userData.image ? (
                    <img 
                        src={userData.image} 
                        alt={userData.name} 
                        className="w-24 h-24 rounded-[2rem] object-cover shadow-xl ring-4 ring-gray-50 dark:ring-gray-800"
                    />
                ) : (
                    <div className="w-24 h-24 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-[2rem] flex items-center justify-center text-white font-bold text-3xl shadow-xl shadow-blue-500/20">
                        {getInitials(userData.name)}
                    </div>
                )}
                
                <div className="space-y-2">
                    <h3 className="text-3xl font-extrabold tracking-tight">{userData.name}</h3>
                    <p className="text-gray-500 flex items-center gap-2"><Mail className="w-4 h-4" /> {userData.email}</p>
                    
                    <div className="flex flex-wrap gap-2 pt-1">
                        {/* Dynamic identity verification badge based on your payload */}
                        {userData.emailVerified ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-green-50 dark:bg-green-950/30 text-green-600 dark:text-green-400 text-[10px] font-bold rounded-md uppercase tracking-wider">
                                <Shield className="w-3 h-3" /> Verified Identity
                            </span>
                        ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 text-[10px] font-bold rounded-md uppercase tracking-wider">
                                <ShieldAlert className="w-3 h-3" /> Unverified Email
                            </span>
                        )}
                        <span className="px-2.5 py-1 bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 text-[10px] font-bold rounded-md uppercase tracking-wider">
                            Role: {userData.role}
                        </span>
                    </div>
                </div>
            </div>

            {/* Profile Information Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5" /> Full Name
                    </label>
                    <p className="font-semibold px-5 py-3.5 bg-gray-50 dark:bg-gray-800/50 text-gray-800 dark:text-gray-200 rounded-xl border border-gray-100/50 dark:border-gray-700/30">
                        {userData.name}
                    </p>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5" /> Account Created
                    </label>
                    <p className="font-semibold px-5 py-3.5 bg-gray-50 dark:bg-gray-800/50 text-gray-800 dark:text-gray-200 rounded-xl border border-gray-100/50 dark:border-gray-700/30">
                        {new Date(userData.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                </div>

                <div className="space-y-2 col-span-1 md:col-span-2">
                    <label className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Bio / Intro</label>
                    <p className="font-medium px-5 py-4 bg-gray-50 dark:bg-gray-800/50 text-gray-600 dark:text-gray-400 leading-relaxed rounded-2xl border border-gray-100/50 dark:border-gray-700/30">
                        Hi, I am {userData.name}! Registered as a {userData.role} on this platform. Looking forward to exploring real estate properties matching my expectations.
                    </p>
                </div>
            </div>

            {/* Actions Footer */}
            <div className="pt-6 border-t border-gray-100 dark:border-gray-800 flex justify-end">
                <button className="bg-blue-600 text-white px-8 py-3.5 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/10 active:scale-95 text-sm">
                    Edit Profile Details
                </button>
            </div>
        </motion.div>
    );
};

export default ProfileTab;