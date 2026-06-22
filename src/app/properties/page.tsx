"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, MapPin, Star, Filter, ArrowUpDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const allProperties = [
    { id: 1, title: "Modern Skyline Villa", location: "New York", price: 4500, type: "Apartment", image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800", rating: 4.8 },
    { id: 2, title: "Serene Garden Cottage", location: "Austin", price: 2800, type: "House", image: "https://images.unsplash.com/photo-1449156001935-d286362537b9?auto=format&fit=crop&q=80&w=800", rating: 4.9 },
    { id: 3, title: "Beachfront Paradise", location: "Miami", price: 5200, type: "Villa", image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=800", rating: 4.7 },
    { id: 4, title: "Luxury Penthouse", location: "Chicago", price: 6000, type: "Penthouse", image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=800", rating: 5.0 },
    { id: 5, title: "Mountain Retreat", location: "Aspen", price: 3500, type: "Cabin", image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80&w=800", rating: 4.6 },
    { id: 6, title: "Urban Loft", location: "Seattle", price: 3100, type: "Loft", image: "https://images.unsplash.com/photo-1536376074432-8cbecbe8170b?auto=format&fit=crop&q=80&w=800", rating: 4.8 },
    { id: 7, title: "Downtown Studio", location: "Los Angeles", price: 2200, type: "Apartment", image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=800", rating: 4.5 },
    { id: 8, title: "Modern Farmhouse", location: "Nashville", price: 3800, type: "House", image: "https://images.unsplash.com/photo-1549517045-bc93de075e53?auto=format&fit=crop&q=80&w=800", rating: 4.9 },
    { id: 9, title: "Lakeside Cabin", location: "Lake Tahoe", price: 4200, type: "Cabin", image: "https://images.unsplash.com/photo-1464146072230-91cabc9fa7c0?auto=format&fit=crop&q=80&w=800", rating: 4.7 },
];

export default function PropertiesPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedType, setSelectedType] = useState('All');
    const [sortBy, setSortBy] = useState('Newest');

    const propertyTypes = ['All', 'Apartment', 'House', 'Villa', 'Penthouse', 'Loft', 'Cabin'];

    const filteredProperties = allProperties.filter(prop => {
        const matchesSearch = prop.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            prop.location.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = selectedType === 'All' || prop.type === selectedType;
        return matchesSearch && matchesType;
    });

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-32 pb-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Page Header */}
                <div className="mb-12">
                    <h1 className="text-4xl font-bold text-gray-200 dark:text-white mb-4">Discover Your Perfect Home</h1>
                    <p className="text-gray-500 text-lg">Browse through our extensive list of premium properties.</p>
                </div>

                {/* Filters Top Bar */}
                <div className="bg-white dark:bg-gray-900 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 mb-12">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
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
                    </div>
                </div>

                {/* Results Info */}
                <div className="flex justify-between items-center mb-8">
                    <p className="text-gray-600 dark:text-gray-400">
                        Showing <span className="font-bold text-gray-900 dark:text-white">{filteredProperties.length}</span> properties
                    </p>
                    <div className="flex gap-2">
                        {/* Could add view toggles here */}
                    </div>
                </div>

                {/* Property Grid */}
                <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence mode='popLayout'>
                        {filteredProperties.map((prop, index) => (
                            <motion.div
                                layout
                                key={prop.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                                className="group bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 dark:border-gray-800 flex flex-col"
                            >
                                <div className="relative aspect-[4/3] overflow-hidden">
                                    <img
                                        src={prop.image}
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
                                            href={`/properties/${prop.id}`}
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

                {filteredProperties.length === 0 && (
                    <div className="text-center py-24">
                        <div className="bg-gray-100 dark:bg-gray-900 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Search className="w-10 h-10 text-gray-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No properties found</h3>
                        <p className="text-gray-500">Try adjusting your filters or search terms.</p>
                        <button
                            onClick={() => { setSearchTerm(''); setSelectedType('All'); }}
                            className="mt-6 text-blue-600 font-bold hover:underline"
                        >
                            Clear all filters
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
