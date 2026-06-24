"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, LogOut, ChevronDown, Building2, Home, Search, LayoutDashboard, ShieldAlert } from 'lucide-react';
import { authClient } from '@/lib/auth-client';

const Header = () => {
    const { data } = authClient.useSession();
    const [isOpen, setIsOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    // Extract user info cleanly from the session data structure
    const user = data?.user;
    const isLoggedIn = !!user?.id;
    // Fallback to 'tenant' if role isn't explicitly defined yet, or cast based on your DB schema
    const userRole = user?.role?.toLowerCase() || 'tenant'; 

    const navLinks = [
        { name: 'Home', href: '/', icon: Home },
        { name: 'All Properties', href: '/properties', icon: Search },
    ];

    // Get the dynamic dashboard link based on user role
    const getDashboardLink = (role: string) => {
        switch (role) {
            case 'admin':
                return { name: 'Admin Dashboard', href: '/dashboard/admin' };
            case 'owner':
                return { name: 'Owner Dashboard', href: '/dashboard/owner' };
            case 'tenant':
            default:
                return { name: 'Tenant Dashboard', href: '/dashboard/tenant' };
        }
    };

    const activeDashboard = getDashboardLink(userRole);

    // Get first letter of name for the fallback avatar
    const getInitial = () => {
        if (user?.name) return user.name.charAt(0).toUpperCase();
        if (user?.email) return user.email.charAt(0).toUpperCase();
        return 'U';
    };

    const handleLogout = async () => {
        await authClient.signOut();
        setIsOpen(false);
        setIsProfileOpen(false);
    };

    return (
        <header className="sticky top-0 z-50 w-full glass shadow-sm border-b border-white/20 backdrop-blur-md text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2">
                        <div className="bg-blue-600 p-1.5 rounded-lg">
                            <Building2 className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-xl font-bold bg-clip-text text-transparent bg-linear-to-r from-blue-600 to-indigo-600">
                            RentEase
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-gray-200 hover:text-blue-600 font-medium transition-colors"
                            >
                                {link.name}
                            </Link>
                        ))}

                        {/* Conditional Dashboard Link */}
                        {isLoggedIn && (
                            <Link
                                href={activeDashboard.href}
                                className="text-gray-200 hover:text-blue-600 font-medium transition-colors"
                            >
                                {activeDashboard.name}
                            </Link>
                        )}

                        {/* Auth Section / Avatar Dropdown */}
                        <div className="flex items-center space-x-4 ml-4">
                            {isLoggedIn ? (
                                <div className="relative">
                                    <button
                                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                                        className="flex items-center space-x-2 focus:outline-none group"
                                    >
                                        {user?.image ? (
                                            <img 
                                                src={user.image} 
                                                alt={user.name || "User"} 
                                                className="w-9 h-9 rounded-full object-cover border-2 border-blue-500"
                                            />
                                        ) : (
                                            <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold border-2 border-blue-400 group-hover:bg-blue-700 transition-colors">
                                                {getInitial()}
                                            </div>
                                        )}
                                        <ChevronDown className={`w-4 h-4 text-gray-200 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
                                    </button>

                                    {/* Profile Dropdown Menu */}
                                    {isProfileOpen && (
                                        <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-100 dark:border-gray-800 py-2 animate-in fade-in slide-in-from-top-2 duration-200 text-gray-800 dark:text-gray-200">
                                            <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-800">
                                                <p className="text-sm font-semibold capitalize truncate">{user?.name || 'User'}</p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user?.email}</p>
                                                <span className="inline-block mt-1 px-2 py-0.5 text-[10px] uppercase tracking-wider font-bold bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300 rounded">
                                                    {userRole}
                                                </span>
                                            </div>
                                            
                                            <Link
                                                href={activeDashboard.href}
                                                className="flex items-center space-x-2 px-4 py-2.5 text-sm hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-600 transition-colors"
                                                onClick={() => setIsProfileOpen(false)}
                                            >
                                                <LayoutDashboard className="w-4 h-4" />
                                                <span>{activeDashboard.name}</span>
                                            </Link>
                                            
                                            <div className="border-t border-gray-100 dark:border-gray-800 my-1"></div>
                                            
                                            <button 
                                                onClick={handleLogout}
                                                className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center space-x-2 transition-colors"
                                            >
                                                <LogOut className="w-4 h-4" />
                                                <span>Logout</span>
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <>
                                    <Link href="/login" className="text-gray-200 hover:text-blue-600 font-medium transition-colors">
                                        Login
                                    </Link>
                                    <Link
                                        href="/register"
                                        className="bg-blue-600 text-white px-5 py-2.5 rounded-full font-medium hover:bg-blue-700 transition-all shadow-md shadow-blue-200 hover:shadow-lg active:scale-95"
                                    >
                                        Register
                                    </Link>
                                </>
                            )}
                        </div>
                    </nav>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-200 hover:text-blue-600 p-2 focus:outline-none"
                        >
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Nav */}
            {isOpen && (
                <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 animate-in slide-in-from-top duration-300 text-gray-800 dark:text-gray-200">
                    <div className="px-4 pt-2 pb-6 space-y-2">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="flex items-center space-x-2 px-3 py-3 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                                onClick={() => setIsOpen(false)}
                            >
                                <link.icon className="w-5 h-5 text-gray-500" />
                                <span>{link.name}</span>
                            </Link>
                        ))}
                        
                        {isLoggedIn && (
                            <>
                                <div className="border-t border-gray-100 dark:border-gray-800 my-2"></div>
                                <Link
                                    href={activeDashboard.href}
                                    className="flex items-center space-x-2 px-3 py-3 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <LayoutDashboard className="w-5 h-5 text-gray-500" />
                                    <span>{activeDashboard.name}</span>
                                </Link>
                            </>
                        )}
                        
                        <div className="border-t border-gray-100 dark:border-gray-800 my-2"></div>
                        
                        {isLoggedIn ? (
                            <div className="pt-2">
                                <div className="flex items-center space-x-3 px-3 py-2 mb-4">
                                    {user?.image ? (
                                        <img src={user.image} alt={user.name || "User"} className="w-10 h-10 rounded-full object-cover" />
                                    ) : (
                                        <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
                                            {getInitial()}
                                        </div>
                                    )}
                                    <div className="truncate">
                                        <p className="text-sm font-semibold capitalize text-gray-800 dark:text-gray-200">{user?.name}</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user?.email}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-red-50 dark:bg-red-900/10 hover:bg-red-100 text-red-600 rounded-xl font-medium transition-colors"
                                >
                                    <LogOut className="w-5 h-5" />
                                    <span>Logout</span>
                                </button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 gap-4 mt-6">
                                <Link
                                    href="/login"
                                    onClick={() => setIsOpen(false)}
                                    className="flex items-center justify-center px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/register"
                                    onClick={() => setIsOpen(false)}
                                    className="flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
                                >
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;