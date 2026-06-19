"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, User, LogOut, ChevronDown, Building2, Home, Search, LayoutDashboard } from 'lucide-react';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    const navLinks = [
        { name: 'Home', href: '/', icon: Home },
        { name: 'All Properties', href: '/properties', icon: Search },
    ];

    const dashboardLinks = [
        { name: 'Tenant Dashboard', href: '/dashboard/tenant' },
        { name: 'Owner Dashboard', href: '/dashboard/owner' },
        { name: 'Admin Dashboard', href: '/dashboard/admin' },
    ];

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

                        {/* Dashboard Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => setIsProfileOpen(!isProfileOpen)}
                                className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 font-medium transition-colors"
                            >
                                <span>Dashboard</span>
                                <ChevronDown className={`w-4 h-4 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {isProfileOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-100 dark:border-gray-800 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                                    {dashboardLinks.map((link) => (
                                        <Link
                                            key={link.name}
                                            href={link.href}
                                            className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-600"
                                            onClick={() => setIsProfileOpen(false)}
                                        >
                                            {link.name}
                                        </Link>
                                    ))}
                                    <div className="border-t border-gray-100 dark:border-gray-800 my-1"></div>
                                    <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center space-x-2">
                                        <LogOut className="w-4 h-4" />
                                        <span>Logout</span>
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="flex items-center space-x-4 ml-4">
                            <Link href="/login" className="text-gray-600 hover:text-blue-600 font-medium">
                                Login
                            </Link>
                            <Link
                                href="/register"
                                className="bg-blue-600 text-white px-5 py-2.5 rounded-full font-medium hover:bg-blue-700 transition-all shadow-md shadow-blue-200 hover:shadow-lg active:scale-95"
                            >
                                Register
                            </Link>
                        </div>
                    </nav>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-600 hover:text-blue-600 p-2"
                        >
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Nav */}
            {isOpen && (
                <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 animate-in slide-in-from-top duration-300">
                    <div className="px-4 pt-2 pb-6 space-y-2">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="flex items-center space-x-2 px-3 py-3 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg"
                                onClick={() => setIsOpen(false)}
                            >
                                <link.icon className="w-5 h-5" />
                                <span>{link.name}</span>
                            </Link>
                        ))}
                        <div className="border-t border-gray-100 dark:border-gray-800 my-2"></div>
                        {dashboardLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="flex items-center space-x-2 px-3 py-3 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg"
                                onClick={() => setIsOpen(false)}
                            >
                                <LayoutDashboard className="w-5 h-5" />
                                <span>{link.name}</span>
                            </Link>
                        ))}
                        <div className="grid grid-cols-2 gap-4 mt-6">
                            <Link
                                href="/login"
                                className="flex items-center justify-center px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-700 dark:text-gray-300 font-medium"
                            >
                                Login
                            </Link>
                            <Link
                                href="/register"
                                className="flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-xl font-medium"
                            >
                                Register
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
