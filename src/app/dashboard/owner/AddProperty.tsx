
"use client";

import React, { useState } from 'react';
import {
    BarChart3, PlusCircle, Building, Inbox,
    Trash2, Edit3, Eye, Check, X as CloseIcon,
    TrendingUp, Users, DollarSign, Image as ImageIcon,
    MapPin, Home, Maximize2, Info
} from 'lucide-react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid,
    Tooltip, ResponsiveContainer, AreaChart, Area
} from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';


const AddProperty = () => {
  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-white dark:bg-gray-900 p-10 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm space-y-10">
                                <div>
                                    <h3 className="text-2xl font-bold mb-2">List a New Property</h3>
                                    <p className="text-gray-500">Detailed information helps you get approved faster.</p>
                                </div>

                                <form className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-4 col-span-2">
                                        <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Property Title</label>
                                        <input type="text" placeholder="e.g. Modern Villa with Pool" className="w-full p-4 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl outline-none focus:ring-2 focus:ring-blue-600 transition-all font-medium" />
                                    </div>
                                    <div className="space-y-4 col-span-2">
                                        <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Description</label>
                                        <textarea placeholder="Describe the lifestyle and key features..." className="w-full p-4 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl h-32 outline-none focus:ring-2 focus:ring-blue-600 transition-all font-medium" />
                                    </div>
                                    <div className="space-y-4">
                                        <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Location</label>
                                        <div className="relative">
                                            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                            <input type="text" placeholder="Full address" className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl outline-none" />
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Property Type</label>
                                        <select className="w-full p-4 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl outline-none appearance-none">
                                            <option>Apartment</option>
                                            <option>House</option>
                                            <option>Villa</option>
                                        </select>
                                    </div>
                                    <div className="space-y-4">
                                        <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Rent Price</label>
                                        <div className="relative">
                                            <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                            <input type="number" placeholder="0.00" className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl outline-none" />
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Rent Cycle</label>
                                        <select className="w-full p-4 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl outline-none appearance-none">
                                            <option>Monthly</option>
                                            <option>Weekly</option>
                                            <option>Daily</option>
                                        </select>
                                    </div>
                                    <div className="grid grid-cols-3 gap-4 col-span-2">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-gray-400 uppercase">Beds</label>
                                            <input type="number" className="w-full p-3 bg-gray-50 dark:bg-gray-800 border-none rounded-xl outline-none" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-gray-400 uppercase">Baths</label>
                                            <input type="number" className="w-full p-3 bg-gray-50 dark:bg-gray-800 border-none rounded-xl outline-none" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-gray-400 uppercase">Size (sqft)</label>
                                            <input type="number" className="w-full p-3 bg-gray-50 dark:bg-gray-800 border-none rounded-xl outline-none" />
                                        </div>
                                    </div>
                                    <div className="space-y-4 col-span-2">
                                        <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Images</label>
                                        <div className="border-2 border-dashed border-gray-100 dark:border-gray-800 rounded-[2rem] p-12 text-center space-y-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all cursor-pointer">
                                            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto"><ImageIcon className="w-6 h-6" /></div>
                                            <p className="text-sm font-medium">Click to upload or drag and drop images</p>
                                            <p className="text-xs text-gray-400">Maximum file size 10MB (JPG, PNG)</p>
                                        </div>
                                    </div>

                                    <button type="submit" className="col-span-2 bg-blue-600 text-white py-5 rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20 active:scale-95">
                                        Submit Property for Review
                                    </button>
                                </form>
                            </motion.div>
  )
}

export default AddProperty