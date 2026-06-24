
"use client";

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
        size: "1850"
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
        size: "4200"
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
        size: "2100"
    }
];

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

const AddProperty = () => {

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // 1. Get the session token from Better Auth Client
    const session = await authClient.getSession();
    console.log('session: ', session);
    const token = session?.data?.session?.token; // Adjust property name depending on your Better Auth version setup (e.g., session.token)

    if (!token) {
        console.error("🔒 Unauthorized: No Better Auth session found.");
        alert("You must be logged in to list a property.");
        return;
    }

    // 2. Safely capture all current form inputs dynamically via FormData API
    const formData = new FormData(e.currentTarget);
    
    // Match the sequence array positions from your elements in the DOM markup
    const formElements = e.currentTarget.elements;
    const title = (formElements[0] as HTMLInputElement).value;
    const description = (formElements[1] as HTMLTextAreaElement).value;
    const location = (formElements[2] as HTMLInputElement).value;
    const type = (formElements[3] as HTMLSelectElement).value;
    const price = (formElements[4] as HTMLInputElement).value;
    const cycle = (formElements[5] as HTMLSelectElement).value;
    const beds = (formElements[6] as HTMLInputElement).value;
    const baths = (formElements[7] as HTMLInputElement).value;
    const size = (formElements[8] as HTMLInputElement).value;

    // 3. Construct the finalized payload object including the image array from state
    const propertyPayload = {
        title,
        description,
        location,
        type,
        price: Number(price),
        rentCycle: cycle,
        beds: Number(beds),
        baths: Number(baths),
        size: Number(size),
        images: uploadedUrls // Your ImgBB returned URL string array from React state
    };

    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    if (!backendUrl) {
        console.error("❌ Backend base endpoint URL string is missing from configuration.");
        return;
    }

    try {
        console.log("📤 Submitting payload to backend:", propertyPayload);

        // 4. Hit the server with the Authorization Bearer header flag matching your spec
        const response = await fetch(`${backendUrl}/api/properties`, { // Adjust route suffix as needed
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(propertyPayload)
        });

        if (!response.ok) {
            throw new Error(`Server returned error status code: ${response.status}`);
        }

        const data = await response.json();
        console.log("🎉 Property successfully created on backend:", data);
        alert("Property submitted for review successfully!");

    } catch (error) {
        console.error("❌ Failed to push property data listing upstream:", error);
        alert("Failed to submit property. Check console details.");
    }
};

    const autofillRandomProperty = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent accidental form submissions
    
    // Pick a random dataset object
    const randomProperty = propertyDummyData[Math.floor(Math.random() * propertyDummyData.length)];
    
    // Locate the inputs inside the active form context
    const inputs = document.querySelectorAll('form input[type="text"], form input[type="number"], form textarea, form select');
    
    if (inputs.length >= 9) {
        (inputs[0] as HTMLInputElement).value = randomProperty.title;
        (inputs[1] as HTMLTextAreaElement).value = randomProperty.description;
        (inputs[2] as HTMLInputElement).value = randomProperty.location;
        (inputs[3] as HTMLSelectElement).value = randomProperty.type;
        (inputs[4] as HTMLInputElement).value = randomProperty.price;
        (inputs[5] as HTMLSelectElement).value = randomProperty.cycle;
        (inputs[6] as HTMLInputElement).value = randomProperty.beds;
        (inputs[7] as HTMLInputElement).value = randomProperty.baths;
        (inputs[8] as HTMLInputElement).value = randomProperty.size;

        // Dispatch synthetic change events so if you add an onChange handler later, your state catches it
        inputs.forEach(input => input.dispatchEvent(new Event('change', { bubbles: true })));
        
        console.log("🎲 Form auto-filled with:", randomProperty.title);
    }
};



    const [uploadedUrls, setUploadedUrls] = useState<UploadedUrls>([]);
    const [isUploading, setIsUploading] = useState<boolean>(false);

    const uploadImagesToImgBB = async (files: FileList | File[]) => {
        const fileArray = Array.from(files);
        const totalImages = fileArray.length;

        // 1. Console log the number of images selected
        console.log(`🚀 Total images selected for upload: ${totalImages}`);

        if (totalImages === 0) return;

        setIsUploading(true);
        const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY as string;

        if (!apiKey) {
            console.error("❌ ImgBB API Key is missing from environment variables.");
            setIsUploading(false);
            return;
        }

        // Local array used to simulate tracking live state logs accurately during the loop
        const localUrlTracker: string[] = [...uploadedUrls];

        // 2. Loop through each image sequentially (one at a time)
        for (let i = 0; i < totalImages; i++) {
            const file = fileArray[i];

            // Console log image name
            console.log(`📸 [${i + 1}/${totalImages}] Starting upload for: "${file.name}"`);

            // Prepare Multipart Form Data required by ImgBB API
            const formData = new FormData();
            formData.append('image', file);

            try {
                // Upload the image to ImgBB API endpoint
                const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
                    method: 'POST',
                    body: formData,
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const result = await response.json();

                if (result.success && result.data?.url) {
                    const newUrl = result.data.url;

                    // Retrieve the url and push that into the React state
                    setUploadedUrls((prevUrls) => [...prevUrls, newUrl]);

                    // Push into our local tracker so we can accurately console log current state context
                    localUrlTracker.push(newUrl);

                    // Console log the state progression
                    console.log(`✅ Successfully uploaded: "${file.name}"`);
                    console.log(`🌐 Current Accumulative URLs:`, localUrlTracker);
                } else {
                    console.error(`❌ Failed to upload "${file.name}": ImgBB structure response error.`);
                }
            } catch (error) {
                console.error(`❌ Error uploading "${file.name}":`, error);
            }
        }

        // 3. Console log that all images have been uploaded
        console.log('🎉 All selected images have processed uploading requests!');
        setIsUploading(false);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            uploadImagesToImgBB(files);
        }
    }





    return (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-white dark:bg-gray-900 p-10 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm space-y-10">
            <div>
                <div className="flex justify-between" >

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
                    <div className="relative border-2 border-dashed border-gray-100 dark:border-gray-800 rounded-[2rem] p-12 text-center space-y-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all cursor-pointer">
                    <input type='file' className='absolute h-full w-full opacity-0 cursor-pointer left-0' onChange={handleFileChange}  multiple />
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