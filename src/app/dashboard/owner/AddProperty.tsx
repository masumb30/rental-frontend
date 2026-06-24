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
import { authClient } from '@/lib/auth-client';

type UploadedUrls = string[];

const propertyDummyData = [
    {
        title: "Modern Minimalist Penthouse",
        description: "Stunning top-floor penthouse featuring floor-to-ceiling panoramic windows, premium built-in smart appliances, a wrap-around balcony, and an exclusive private roofdeck pool setup.",
        location: "742 Evergreen Terrace, Sector 4, Metro City",
        type: "Apartment",
        price: "2400",
        cycle: "Monthly",
        beds: "3",
        baths: "2",
        size: "1850",
        amenities: "WiFi, Gym Access, Swimming Pool, 24/7 Security, Underground Parking",
        features: "Smart Lock, Wine Cooler, Floor-to-Ceiling Windows, Wrap-around Balcony, Private Roofdeck"
    },
    {
        title: "Luxury Waterfront Villa",
        description: "An elegant oasis right by the bay. Complete with an open-concept chef's kitchen, private boat dock access, fully integrated smart climate control, and a manicured tropical garden landscape.",
        location: "1012 Ocean Drive, Highcrest Estates",
        type: "Villa",
        price: "650",
        cycle: "Daily",
        beds: "5",
        baths: "6",
        size: "4200",
        amenities: "High-Speed WiFi, Infinity Pool, Private Beach Access, Outdoor Kitchen, Spa Hot Tub",
        features: "Boat Dock, Chef's Kitchen, Smart Climate Control, Tropical Garden, Electric Vehicle Charger"
    },
    {
        title: "Charming Suburban Family House",
        description: "Quiet and cozy family dwelling nestled in a highly rated school district zone. Features a large fenced backyard perfect for pets, a finished basement studio space, and a renovated 2-car garage.",
        location: "53 Speedwell Lane, Maplewood Suburbs",
        type: "House",
        price: "850",
        cycle: "Weekly",
        beds: "4",
        baths: "2.5",
        size: "2100",
        amenities: "WiFi, Central Heating, Laundry Room, Pet Friendly, Playground Access",
        features: "Fenced Backyard, Finished Basement Studio, 2-Car Garage, Fireplace, Recently Renovated"
    }
];

const AddProperty = () => {
    // 1. Centralized Form State
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        location: '',
        type: 'Apartment',
        price: '',
        cycle: 'Monthly',
        beds: '',
        baths: '',
        size: '',
        amenities: '',
        features: ''
    });

    const [uploadedUrls, setUploadedUrls] = useState<UploadedUrls>([]);
    const [isUploading, setIsUploading] = useState<boolean>(false);

    // Generic change handler for inputs, select menus, and textareas
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    // Autofill updates state directly—no fragile DOM querying needed
    const autofillRandomProperty = (e: React.MouseEvent) => {
        e.preventDefault();
        const randomProperty = propertyDummyData[Math.floor(Math.random() * propertyDummyData.length)];
        setFormData(randomProperty);
        console.log("🎲 Form state auto-filled with:", randomProperty.title);
    };

    const uploadImagesToImgBB = async (files: FileList | File[]) => {
        const fileArray = Array.from(files);
        const totalImages = fileArray.length;

        console.log(`🚀 Total images selected for upload: ${totalImages}`);
        if (totalImages === 0) return;

        setIsUploading(true);
        const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY as string;

        if (!apiKey) {
            console.error("❌ ImgBB API Key is missing from environment variables.");
            setIsUploading(false);
            return;
        }

        const localUrlTracker: string[] = [...uploadedUrls];

        for (let i = 0; i < totalImages; i++) {
            const file = fileArray[i];
            console.log(`📸 [${i + 1}/${totalImages}] Starting upload for: "${file.name}"`);

            const formDataPayload = new FormData();
            formDataPayload.append('image', file);

            try {
                const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
                    method: 'POST',
                    body: formDataPayload,
                });

                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

                const result = await response.json();

                if (result.success && result.data?.url) {
                    const newUrl = result.data.url;
                    setUploadedUrls((prevUrls) => [...prevUrls, newUrl]);
                    localUrlTracker.push(newUrl);

                    console.log(`✅ Successfully uploaded: "${file.name}"`);
                    console.log(`🌐 Current Accumulative URLs:`, localUrlTracker);
                } else {
                    console.error(`❌ Failed to upload "${file.name}": ImgBB structure response error.`);
                }
            } catch (error) {
                console.error(`❌ Error uploading "${file.name}":`, error);
            }
        }

        console.log('🎉 All selected images have processed uploading requests!');
        setIsUploading(false);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            uploadImagesToImgBB(files);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        const session = await authClient.getSession();
        const token = session?.data?.session?.token;

        if (!token) {
            console.error("🔒 Unauthorized: No Better Auth session found.");
            alert("You must be logged in to list a property.");
            return;
        }

        // Mapping types safely directly out of state
        const propertyPayload = {
            title: formData.title,
            description: formData.description,
            location: formData.location,
            type: formData.type,
            price: Number(formData.price),
            rentCycle: formData.cycle,
            beds: Number(formData.beds),
            baths: Number(formData.baths),
            size: Number(formData.size),
            amenities: formData.amenities.split(',').map(item => item.trim()).filter(Boolean),
            extraFeatures: formData.features.split(',').map(item => item.trim()).filter(Boolean),
            images: uploadedUrls
        };

        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
        if (!backendUrl) {
            console.error("❌ Backend base endpoint URL string is missing from configuration.");
            return;
        }

        try {
            console.log("📤 Submitting payload to backend:", propertyPayload);

            const response = await fetch(`${backendUrl}/properties`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(propertyPayload)
            });

            if (!response.ok) throw new Error(`Server status code: ${response.status}`);

            const data = await response.json();
            console.log("🎉 Property successfully created on backend:", data);
            alert("Property submitted for review successfully!");
        } catch (error) {
            console.error("❌ Failed to push property data upstream:", error);
            alert("Failed to submit property. Check console details.");
        }
    };

    return (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-white dark:bg-gray-900 p-10 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm space-y-10">
            <div>
                <div className="flex justify-between">
                    <h3 className="text-2xl font-bold mb-2">List a New Property</h3>
                    <button onClick={autofillRandomProperty} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-2xl transition-all">
                        Autofill
                    </button>
                </div>
                <p className="text-gray-500">Detailed information helps you get approved faster.</p>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4 col-span-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Property Title</label>
                    <input name="title" value={formData.title} onChange={handleChange} type="text" placeholder="e.g. Modern Villa with Pool" className="w-full p-4 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl outline-none focus:ring-2 focus:ring-blue-600 transition-all font-medium" required />
                </div>
                
                <div className="space-y-4 col-span-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Description</label>
                    <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Describe the lifestyle and key features..." className="w-full p-4 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl h-32 outline-none focus:ring-2 focus:ring-blue-600 transition-all font-medium" required />
                </div>
                
                <div className="space-y-4">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Location</label>
                    <div className="relative">
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input name="location" value={formData.location} onChange={handleChange} type="text" placeholder="Full address" className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl outline-none" required />
                    </div>
                </div>
                
                <div className="space-y-4">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Property Type</label>
                    <select name="type" value={formData.type} onChange={handleChange} className="w-full p-4 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl outline-none appearance-none">
                        <option value="Apartment">Apartment</option>
                        <option value="House">House</option>
                        <option value="Villa">Villa</option>
                    </select>
                </div>
                
                <div className="space-y-4">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Rent Price</label>
                    <div className="relative">
                        <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input name="price" value={formData.price} onChange={handleChange} type="number" placeholder="0.00" className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl outline-none" required />
                    </div>
                </div>
                
                <div className="space-y-4">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Rent Cycle</label>
                    <select name="cycle" value={formData.cycle} onChange={handleChange} className="w-full p-4 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl outline-none appearance-none">
                        <option value="Monthly">Monthly</option>
                        <option value="Weekly">Weekly</option>
                        <option value="Daily">Daily</option>
                    </select>
                </div>
                
                <div className="grid grid-cols-3 gap-4 col-span-2">
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-gray-400 uppercase">Beds</label>
                        <input name="beds" value={formData.beds} onChange={handleChange} type="number" className="w-full p-3 bg-gray-50 dark:bg-gray-800 border-none rounded-xl outline-none" required />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-gray-400 uppercase">Baths</label>
                        <input name="baths" value={formData.baths} onChange={handleChange} type="number" className="w-full p-3 bg-gray-50 dark:bg-gray-800 border-none rounded-xl outline-none" required />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-gray-400 uppercase">Size (sqft)</label>
                        <input name="size" value={formData.size} onChange={handleChange} type="number" className="w-full p-3 bg-gray-50 dark:bg-gray-800 border-none rounded-xl outline-none" required />
                    </div>
                </div>

                <div className="space-y-4 col-span-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Amenities</label>
                    <textarea name="amenities" value={formData.amenities} onChange={handleChange} placeholder="Add comma separated amenities... " className="w-full p-4 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl h-32 outline-none focus:ring-2 focus:ring-blue-600 transition-all font-medium" required />
                </div>
                <div className="space-y-4 col-span-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Fetures</label>
                    <textarea name="features" value={formData.features} onChange={handleChange} placeholder="Add comma separated features... " className="w-full p-4 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl h-32 outline-none focus:ring-2 focus:ring-blue-600 transition-all font-medium" required />
                </div>

                
                <div className="space-y-4 col-span-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Images</label>
                    <div className="relative border-2 border-dashed border-gray-100 dark:border-gray-800 rounded-[2rem] p-12 text-center space-y-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all cursor-pointer">
                        <input type='file' className='absolute h-full w-full opacity-0 cursor-pointer left-0' onChange={handleFileChange} multiple disabled={isUploading} />
                        <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto">
                            <ImageIcon className="w-6 h-6" />
                        </div>
                        <p className="text-sm font-medium">
                            {isUploading ? "Uploading photos..." : "Click to upload or drag and drop images"}
                        </p>
                        <p className="text-xs text-gray-400">
                            {uploadedUrls.length > 0 ? `✅ ${uploadedUrls.length} image(s) uploaded successfully` : "Maximum file size 10MB (JPG, PNG)"}
                        </p>
                    </div>
                </div>

                <button type="submit" disabled={isUploading} className="col-span-2 bg-blue-600 text-white py-5 rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed">
                    {isUploading ? "Waiting for images to upload..." : "Submit Property for Review"}
                </button>
            </form>
        </motion.div>
    );
};

export default AddProperty;