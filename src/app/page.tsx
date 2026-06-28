"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Search, MapPin, Home, DollarSign, Star, Shield, Zap, TrendingUp, Users } from 'lucide-react';
import FeaturedProperties from './FeaturedProperties';
import HeroSection from './HeroSection';

const properties = [
  {
    id: 1,
    title: "Modern Skyline Villa",
    location: "Manhattan, New York",
    price: 4500,
    type: "Apartment",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800",
    rating: 4.8,
  },
  {
    id: 2,
    title: "Serene Garden Cottage",
    location: "Austin, Texas",
    price: 2800,
    type: "House",
    image: "https://images.unsplash.com/photo-1449156001935-d286362537b9?auto=format&fit=crop&q=80&w=800",
    rating: 4.9,
  },
  {
    id: 3,
    title: "Beachfront Paradise",
    location: "Miami, Florida",
    price: 5200,
    type: "Villa",
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=800",
    rating: 4.7,
  },
  {
    id: 4,
    title: "Luxury Penthouse",
    location: "Chicago, Illinois",
    price: 6000,
    type: "Penthouse",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=800",
    rating: 5.0,
  },
  {
    id: 5,
    title: "Mountain Retreat",
    location: "Aspen, Colorado",
    price: 3500,
    type: "Cabin",
    image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80&w=800",
    rating: 4.6,
  },
  {
    id: 6,
    title: "Urban Loft",
    location: "Seattle, Washington",
    price: 3100,
    type: "Loft",
    image: "https://images.unsplash.com/photo-1536376074432-8cbecbe8170b?auto=format&fit=crop&q=80&w=800",
    rating: 4.8,
  },
];

const reviews = [
  { id: 1, name: "Sarah Johnson", email: "sarah.j@example.com", text: "Found the most beautiful apartment in NYC. The booking process was so smooth!", rating: 5 },
  { id: 2, name: "Michael Chen", email: "m.chen@example.com", text: "Great platform for owners. Managed to rent out my property within a week.", rating: 4 },
  { id: 3, name: "Elena Rodriguez", email: "elena.r@example.com", text: "Top-notch customer service. They helped me with every detail of my move.", rating: 5 },
  { id: 4, name: "David Wilson", email: "d.wilson@example.com", text: "Highly recommend for anyone looking for premium, verified properties.", rating: 5 },
];

const homeStats = [
  { label: "Total Bookings", value: "12k+", icon: Zap },
  { label: "Verified Owners", value: "800+", icon: Shield },
  { label: "Properties", value: "5k+", icon: Home },
  { label: "Happy Tenants", value: "25k+", icon: Users },
];

const popularLocations = [
  { city: "New York", count: "1.2k Properties", image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&q=80&w=400" },
  { city: "Los Angeles", count: "850 Properties", image: "https://images.unsplash.com/photo-1501139083538-0139583c060f?auto=format&fit=crop&q=80&w=400" },
  { city: "London", count: "2.5k Properties", image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=80&w=400" },
  { city: "Tokyo", count: "1.8k Properties", image: "https://images.unsplash.com/photo-1513407030348-c983a97b98d8?q=80&w=872&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
];

export default function HomePage() {
  return (
    <div className="space-y-24 pb-24">
      {/* Hero Banner Section */}

      <HeroSection />

      {/* Featured Properties Section */}
      <FeaturedProperties />

      {/* Top Locations Section */}
      <section className="bg-gray-100 dark:bg-gray-900/50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Top Locations</h2>
              <p className="text-gray-500 text-lg">Explore the most popular rental destinations worldwide.</p>
            </div>
            <Link href="/properties" className="text-blue-600 font-semibold hover:underline flex items-center gap-2">
              View all locations <TrendingUp className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularLocations.map((loc, i) => (
              <motion.div
                key={loc.city}
                whileHover={{ y: -10 }}
                className="relative h-64 rounded-3xl overflow-hidden group cursor-pointer"
              >
                <img src={loc.image} alt={loc.city} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-2xl font-bold">{loc.city}</h3>
                  <p className="text-gray-300 text-sm">{loc.count}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white leading-tight">
              We Provide The Best <br />
              <span className="text-blue-600">Rental Experience</span> For You
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="space-y-3">
                <div className="bg-blue-100 dark:bg-blue-900/30 w-12 h-12 flex items-center justify-center rounded-2xl">
                  <Shield className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white">Verified Listings</h3>
                <p className="text-gray-500 text-sm">Every property is manually checked for safety and authenticity.</p>
              </div>
              <div className="space-y-3">
                <div className="bg-green-100 dark:bg-green-900/30 w-12 h-12 flex items-center justify-center rounded-2xl">
                  <Zap className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white">Fast Booking</h3>
                <p className="text-gray-500 text-sm">Instant confirmation and digital keys for seamless move-ins.</p>
              </div>
              <div className="space-y-3">
                <div className="bg-amber-100 dark:bg-amber-900/30 w-12 h-12 flex items-center justify-center rounded-2xl">
                  <DollarSign className="w-6 h-6 text-amber-600" />
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white">Transparent Pricing</h3>
                <p className="text-gray-500 text-sm">No hidden fees. What you see is exactly what you pay each month.</p>
              </div>
              <div className="space-y-3">
                <div className="bg-purple-100 dark:bg-purple-900/30 w-12 h-12 flex items-center justify-center rounded-2xl">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white">Elite Community</h3>
                <p className="text-gray-500 text-sm">Join a network of professional tenants and reputable landlords.</p>
              </div>
            </div>
          </div>
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="relative z-10 rounded-[4rem] overflow-hidden shadow-2xl rotate-3 h-[600px]"
            >
              <img
                src="https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?q=80&w=536&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                className="w-full h-full object-cover"
                alt="Modern Architecture"
              />
            </motion.div>
            <div className="absolute -top-12 -right-12 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl -z-10"></div>
            <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl -z-10"></div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-blue-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {homeStats.map((stat, i) => (
              <div key={i} className="text-center text-white space-y-2">
                <div className="mx-auto w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                  <stat.icon className="w-6 h-6" />
                </div>
                <div className="text-4xl font-extrabold">{stat.value}</div>
                <div className="text-blue-100 text-sm font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Loved by our Customers</h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">Hear what our tenants and property owners have to say about RentEase.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((rev, i) => (
            <div key={rev.id} className="bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 space-y-6 flex flex-col h-full hover:shadow-xl transition-shadow">
              <div className="flex text-amber-400">
                {[...Array(rev.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
              <p className="text-gray-600 dark:text-gray-400 italic leading-relaxed flex-grow">"{rev.text}"</p>
              <div className="flex items-center gap-3 pt-6 border-t border-gray-50 dark:border-gray-800">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center font-bold text-blue-600">
                  {rev.name[0]}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white text-sm">{rev.name}</h4>
                  <p className="text-gray-500 text-xs">{rev.email}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gray-900 rounded-[3rem] p-12 md:p-20 relative overflow-hidden text-center">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.2),transparent)]"></div>
          <div className="relative z-10 space-y-10">
            <h2 className="text-4xl md:text-5xl font-bold text-white max-w-3xl mx-auto leading-tight">
              Ready to List Your Property or Find Your New Home?
            </h2>
            <p className="text-gray-400 text-lg max-w-xl mx-auto">
              Join thousands of happy users today. Start your journey with RentEase and experience the difference.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/register" className="px-10 py-4 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-900/20 active:scale-95">
                Get Started
              </Link>
              <Link href="/properties" className="px-10 py-4 bg-white/10 text-white border border-white/20 rounded-full font-bold hover:bg-white/20 transition-all backdrop-blur-md active:scale-95">
                Explore Listings
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
