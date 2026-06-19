import React from 'react';
import Link from 'next/link';
// import { Building2, Facebook, Instagram, Linkedin, Send, Mail, Phone, MapPin } from 'lucide-react';



const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Brand Section */}
                    {/* <div className="space-y-6">
                        <Link href="/" className="flex items-center space-x-2">
                            <div className="bg-blue-600 p-1.5 rounded-lg">
                                <Building2 className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-xl font-bold text-white">RentEase</span>
                        </Link>
                        <p className="text-gray-400 leading-relaxed">
                            Simplifying the journey of finding and booking your next dream home. Premium properties at your fingertips.
                        </p>
                        <div className="flex space-x-4">
                            <Link href="#" className="p-2 bg-gray-800 rounded-full hover:bg-blue-600 transition-colors group">
                                <Facebook className="w-5 h-5 group-hover:text-white" />
                            </Link>
                            <Link href="#" className="p-2 bg-gray-800 rounded-full hover:bg-blue-600 transition-colors group">
                                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current group-hover:text-white">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                </svg>
                            </Link>
                            <Link href="#" className="p-2 bg-gray-800 rounded-full hover:bg-blue-600 transition-colors group">
                                <Instagram className="w-5 h-5 group-hover:text-white" />
                            </Link>
                            <Link href="#" className="p-2 bg-gray-800 rounded-full hover:bg-blue-600 transition-colors group">
                                <Linkedin className="w-5 h-5 group-hover:text-white" />
                            </Link>
                        </div>
                    </div> */}

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
                    {/* <div>
                        <h3 className="text-white font-semibold text-lg mb-6">Contact Us</h3>
                        <ul className="space-y-4 text-gray-400">
                            <li className="flex items-center space-x-3 text-gray-400 leading-relaxed">
                                <MapPin className="w-5 h-5 text-blue-500 flex-shrink-0" />
                                <span>123 Realty Boulevard, Property Plaza, NY 10001</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Phone className="w-5 h-5 text-blue-500 flex-shrink-0" />
                                <span>+1 (555) 000-0000</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Mail className="w-5 h-5 text-blue-500 flex-shrink-0" />
                                <span>hello@rentease.com</span>
                            </li>
                        </ul>
                    </div> */}

                    {/* Newsletter */}
                    <div>
                        <h3 className="text-white font-semibold text-lg mb-6">Newsletter</h3>
                        <p className="text-gray-400 mb-4">Subscribe to get the latest property updates.</p>
                        <form className="relative group">
                            <input
                                type="email"
                                placeholder="Your email"
                                className="w-full bg-gray-800 border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-blue-600 transition-all outline-none"
                            />
                            <button className="absolute right-2 top-1.5 p-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
                                {/* <Send className="w-4 h-4 text-white" /> */}
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
