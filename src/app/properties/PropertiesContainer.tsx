"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, MapPin, Star, Filter, ArrowUpDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Pagination from './Pagination';

const PropertiesContainer = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageInfo, setPageInfo] = useState({ totalPages: 1, currentPage: 1 });
    const [properties, setProperties] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedType, setSelectedType] = useState('All');
    const [sortBy, setSortBy] = useState('Newest');
    const [isLoading, setIsLoading] = useState(true);

    const handleFilterCLear= ()=> {
        setSearchTerm('');
        setSelectedType('All');
        setSortBy('Newest');
        setCurrentPage(1);
        fetchProperties();
    }

    const propertyTypes = ['All', 'Apartment', 'House', 'Villa', 'Penthouse', 'Loft', 'Cabin'];

    // 1. Centralized fetch function that constructs the URL parameters
    const fetchProperties = async (search = '', type = 'All', sort = 'Newest', page = 1) => {
        setIsLoading(true);
        try {
            const params = new URLSearchParams();

            if (search.trim()) params.append('search', search.trim());
            if (type !== 'All') params.append('type', type);
            if (sort) params.append('sortBy', sort);

            // FIX #1: Actually append the page parameter to your backend request URL!
            params.append('page', page.toString());

            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/properties?${params.toString()}`);
            if (!response.ok) throw new Error('Failed to fetch properties');

            const data = await response.json();
            console.log('property data:', data);
            setProperties(data.data);
            setPageInfo(data.pageInfo);
        } catch (error) {
            console.error("Error fetching properties:", error);
        } finally {
            setIsLoading(false);
        }
    };

    // 2. Initial mount fetch
    React.useEffect(() => {
        fetchProperties();
    }, []);

    // 3. Triggered explicitly by the search button
    const handleSearch = () => {
        // Reset back to page 1 on a fresh filter/search execution
        setCurrentPage(1);
        fetchProperties(searchTerm, selectedType, sortBy, 1);
    };

    return (
        <>
            {/* Filter Panel */}
            <div className="bg-white dark:bg-gray-900 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 mb-12">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-end">
                    <div className="col-span-1 md:col-span-2 space-y-2">
                        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                            <Search className="w-4 h-4" /> Search Location or Name
                        </label>
                        <input
                            type="text"
                            placeholder="Where are you looking for?"
                            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border-none rounded-xl focus:ring-2 focus:ring-blue-600 outline-none transition-all"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                            <Filter className="w-4 h-4" /> Property Type
                        </label>
                        <select
                            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border-none rounded-xl focus:ring-2 focus:ring-blue-600 outline-none transition-all appearance-none"
                            value={selectedType}
                            onChange={(e) => setSelectedType(e.target.value)}
                        >
                            {propertyTypes.map(type => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                            <ArrowUpDown className="w-4 h-4" /> Sort By
                        </label>
                        <select
                            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border-none rounded-xl focus:ring-2 focus:ring-blue-600 outline-none transition-all appearance-none"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                        >
                            <option>Newest</option>
                            <option>Price: Low to High</option>
                            <option>Price: High to Low</option>
                            <option>Rating</option>
                        </select>
                    </div>
                    <div className="flex flex-col gap-1">
                        <button onClick={handleFilterCLear} className="bg-blue-600 text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-blue-700 transition-all  shadow-blue-200  active:scale-95">Clear</button>
                        <button onClick={handleSearch} className="bg-blue-600 text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-blue-700 transition-all shadow-blue-200  active:scale-95">Search</button>
                    </div>
                </div>
            </div>

            {/* Sub-header Counter */}
            <div className="flex justify-between items-center mb-8">
                <p className="text-gray-600 dark:text-gray-400">
                    Showing <span className="font-bold text-gray-900 dark:text-white">{properties.length}</span> properties
                </p>
            </div>

            {/* Property Grid & Dynamic Loader */}
            {isLoading ? (
                <div className="flex flex-col items-center justify-center py-20 w-full col-span-full">
                    <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    <p className="mt-4 text-gray-500 dark:text-gray-400 font-medium">Loading properties...</p>
                </div>
            ) : (
                <>
                    <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <AnimatePresence mode='popLayout'>
                            {properties.map((prop: any) => (
                                <motion.div
                                    layout
                                    key={prop._id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.3 }}
                                    className="group bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 dark:border-gray-800 flex flex-col"
                                >
                                    <div className="relative aspect-[4/3] overflow-hidden">
                                        <img
                                            src={prop.images?.[0] || prop.image}
                                            alt={prop.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-sm font-bold text-blue-600 shadow-sm">
                                            {prop.type}
                                        </div>
                                    </div>
                                    <div className="p-6 flex flex-col flex-grow">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">{prop.title}</h3>
                                            <div className="flex items-center text-amber-500">
                                                <Star className="w-4 h-4 fill-current" />
                                                <span className="ml-1 text-sm font-semibold">{prop.rating}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center text-gray-500 mb-6 text-sm">
                                            <MapPin className="w-4 h-4 mr-1" />
                                            <span>{prop.location}</span>
                                        </div>
                                        <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-50 dark:border-gray-800">
                                            <div>
                                                <span className="text-2xl font-bold text-blue-600">${prop.price}</span>
                                                <span className="text-gray-500 text-sm italic ml-1">/ mo</span>
                                            </div>
                                            <Link
                                                href={`/properties/${prop._id}`}
                                                className="bg-blue-600 text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-blue-700 transition-all active:scale-95 shadow-lg shadow-blue-500/20"
                                            >
                                                View Details
                                            </Link>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>

                    {/* FIX #2: Pagination placed cleanly underneath the grid instead of inside it */}
                    <Pagination
                        pageInfo={pageInfo}
                        onPageChange={(targetPage) => {
                            setCurrentPage(targetPage);
                            fetchProperties(searchTerm, selectedType, sortBy, targetPage);
                        }}
                    />
                </>
            )}
        </>
    );
};

export default PropertiesContainer;