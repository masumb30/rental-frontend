"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, MapPin, Star, Filter, ArrowUpDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import PropertiesContainer from './PropertiesContainer';

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

    // const filteredProperties = allProperties.filter(prop => {
    //     const matchesSearch = prop.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //         prop.location.toLowerCase().includes(searchTerm.toLowerCase());
    //     const matchesType = selectedType === 'All' || prop.type === selectedType;
    //     return matchesSearch && matchesType;
    // });



    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-16 pb-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Page Header */}
                <div className="mb-12">
                    <h1 className="text-4xl font-bold text-gray-200 dark:text-white mb-4">Discover Your Perfect Home</h1>
                    <p className="text-gray-500 text-lg">Browse through our extensive list of premium properties.</p>
                </div>

                {/* Filters Top Bar */}


                <PropertiesContainer />


                {/* Results Info */}


                {/* {filteredProperties.length === 0 && (
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
                )} */}
            </div>
        </div>
    );
}
