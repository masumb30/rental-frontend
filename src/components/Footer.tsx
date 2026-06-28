'use client'
import React from 'react';
import Link from 'next/link';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Brand Section */}
                    <div className="space-y-6">
                        <Link href="/" className="flex items-center space-x-2">
                            <div className="bg-blue-600 p-1.5 rounded-lg">
                                {/* SVG Building2 Icon */}
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-white">
                                    <path d="M6 22V4a2 2 0 0 1 2-2h8 a2 2 0 0 1 2 2v18" />
                                    <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" />
                                    <path d="M18 9h2a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-2" />
                                    <path d="M10 6h4" />
                                    <path d="M10 10h4" />
                                    <path d="M10 14h4" />
                                    <path d="M10 18h4" />
                                </svg>
                            </div>
                            <span className="text-xl font-bold text-white">RentEase</span>
                        </Link>
                        <p className="text-gray-400 leading-relaxed">
                            Simplifying the journey of finding and booking your next dream home. Premium properties at your fingertips.
                        </p>
                        <div className="flex space-x-4">
                            <Link href="#" className="p-2 bg-gray-800 rounded-full hover:bg-blue-600 transition-colors group">
                                {/* SVG Facebook Icon */}
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 group-hover:text-white">
                                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                                </svg>
                            </Link>
                            <Link href="#" className="p-2 bg-gray-800 rounded-full hover:bg-blue-600 transition-colors group">
                                {/* X (Twitter) Icon */}
                                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current group-hover:text-white">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                </svg>
                            </Link>
                            <Link href="#" className="p-2 bg-gray-800 rounded-full hover:bg-blue-600 transition-colors group">
                                {/* SVG Instagram Icon */}
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 group-hover:text-white">
                                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                                </svg>
                            </Link>
                            <Link href="#" className="p-2 bg-gray-800 rounded-full hover:bg-blue-600 transition-colors group">
                                {/* SVG Linkedin Icon */}
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 group-hover:text-white">
                                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                                    <rect width="4" height="12" x="2" y="9" />
                                    <circle cx="4" cy="4" r="2" />
                                </svg>
                            </Link>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-semibold text-lg mb-6">Quick Links</h3>
                        <ul className="space-y-4">
                            <li><Link href="/properties" className="hover:text-blue-500 transition-colors">Search Houses</Link></li>
                            <li><Link href="#" className="hover:text-blue-500 transition-colors">Become an Owner</Link></li>
                            <li><Link href="#" className="hover:text-blue-500 transition-colors">Member Support</Link></li>
                            <li><Link href="#" className="hover:text-blue-500 transition-colors">Trust & Safety</Link></li>
                            <li><Link href="#" className="hover:text-blue-500 transition-colors">Rental Resources</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-white font-semibold text-lg mb-6">Contact Us</h3>
                        <ul className="space-y-4 text-gray-400">
                            <li className="flex items-start space-x-3 text-gray-400 leading-relaxed">
                                {/* SVG MapPin Icon */}
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5">
                                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                                    <circle cx="12" cy="10" r="3" />
                                </svg>
                                <span>123 Realty Boulevard, Property Plaza, NY 10001</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                {/* SVG Phone Icon */}
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-blue-500 flex-shrink-0">
                                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                                </svg>
                                <span>+1 (555) 000-0000</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                {/* SVG Mail Icon */}
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-blue-500 flex-shrink-0">
                                    <rect width="20" height="16" x="2" y="4" rx="2" />
                                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                                </svg>
                                <span>hello@rentease.com</span>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="text-white font-semibold text-lg mb-6">Newsletter</h3>
                        <p className="text-gray-400 mb-4">Subscribe to get the latest property updates.</p>
                        <form className="relative group" onSubmit={(e) => e.preventDefault()}>
                            <input
                                type="email"
                                placeholder="Your email"
                                className="w-full bg-gray-800 border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-blue-600 transition-all outline-none text-gray-100 placeholder-gray-500"
                            />
                            <button type="submit" className="absolute right-2 top-1.5 p-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center">
                                {/* SVG Send Icon */}
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-white">
                                    <path d="m22 2-7 20-4-9-9-4Z" />
                                    <path d="M22 2 11 13" />
                                </svg>
                            </button>
                        </form>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-16 pt-8 text-center text-gray-500 text-sm">
                    <p>© {new Date().getFullYear()} RentEase Terminal. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;