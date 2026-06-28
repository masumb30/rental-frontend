"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Search, MapPin, Home, DollarSign, Star, Shield, Zap, TrendingUp, Users } from 'lucide-react';

const HeroSection = () => {

    const handleSearch = ()=> {

    }
  return (
    <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2000')" }}
        >
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            Find Your Next <span className="text-blue-400">Dream Home</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto">
            Discover premium rental properties tailored to your lifestyle. Secure, verified, and effortless booking.
          </p>

          {/* Search Bar */}
          <div className="bg-white/95 backdrop-blur-md p-4 rounded-3xl shadow-2xl flex flex-wrap lg:flex-nowrap items-center gap-4 border border-white/20">
            <div className="flex-1 min-w-[200px] relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Location..."
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border-none rounded-2xl text-gray-900 focus:ring-2 focus:ring-blue-500 transition-all outline-none"
              />
            </div>
            <div className="flex-1 min-w-[150px] relative">
              <Home className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select className="w-full pl-10 pr-4 py-3 bg-gray-50 border-none rounded-2xl text-gray-900 focus:ring-2 focus:ring-blue-500 transition-all outline-none appearance-none">
                <option>Property Type</option>
                <option>Apartment</option>
                <option>House</option>
                <option>Villa</option>
              </select>
            </div>
            <div className="flex-1 min-w-[120px] relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="number"
                placeholder="Min Price"
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border-none rounded-2xl text-gray-900 focus:ring-2 focus:ring-blue-500 transition-all outline-none"
              />
            </div>
            <div className="flex-1 min-w-[120px] relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="number"
                placeholder="Max Price"
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border-none rounded-2xl text-gray-900 focus:ring-2 focus:ring-blue-500 transition-all outline-none"
              />
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-2xl font-semibold flex items-center justify-center gap-2 transition-all active:scale-95 group shadow-lg shadow-blue-500/30">
              <Search className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <Link href="/properties" className="ml-2">Search</Link>
            </button>
          </div>
        </motion.div>
      </section>
  )
}

export default HeroSection