"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Search, MapPin, Home, DollarSign, Star, Shield, Zap, TrendingUp, Users } from 'lucide-react';

const FeaturedProperties = () => {
    const [properties, setProperties] = useState([]);

  React.useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/properties/featured`, { cache: 'no-store' });

        if (!response.ok) {
          throw new Error('Failed to fetch properties');
        }

        const data = await response.json();
        console.log('Fetched properties:', data);
        setProperties(data.data);
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };

    fetchProperties();
}, []);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Featured Properties</h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">Hand-picked premium listings in the most sought-after neighborhoods.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((prop:any, index) => (
            <motion.div
              key={prop._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-800 flex flex-col"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={prop.images[0]}
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
                <div className="flex items-center text-gray-500 mb-4 text-sm">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{prop.location}</span>
                </div>
                <div className="mt-auto flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-blue-600">${prop.price}</span>
                    <span className="text-gray-500 text-sm italic ml-1">/ Month</span>
                  </div>
                  <Link
                    href={`/properties/${prop._id}`}
                    className="bg-gray-100 dark:bg-gray-800 hover:bg-blue-600 hover:text-white text-gray-700 dark:text-gray-300 px-4 py-2 rounded-xl text-sm font-semibold transition-all group/btn flex items-center gap-2"
                  >
                    View Details
                    <TrendingUp className="w-4 h-4 opacity-0 -translate-x-2 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 transition-all" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
  )
}

export default FeaturedProperties