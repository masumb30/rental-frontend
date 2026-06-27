"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
    MapPin, Star, Bed, Bath, Maximize, User, Calendar,
    Heart, Share2, ShieldCheck, CheckCircle2, ChevronRight,
    TrendingUp, CreditCard, X, Send, Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ReviewSection from './ReviewSection';

// TypeScript interfaces ensuring type safety against dynamic structural objects
interface PropertyData {
    _id: string;
    id: string;
    title: string;
    description: string;
    location: string;
    price: number;
    type: string;
    beds: number;
    baths: number;
    size: number;
    images: string[];
    extraFeatures: string[];
    amenities: string[];
    rating: number;
    ownerInfo: {
        id:string
        name: string;
        avatar: string;
    };
    reviews: Array<{
        id: string;
        name: string;
        date: string;
        rating: number;
        text: string;
    }>;
}

export default function PropertyDetailsPage() {
    const { id } = useParams();
    const [propertyDetails, setPropertyDetails] = useState<PropertyData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    const [activeImage, setActiveImage] = useState(0);
    const [isBookModalOpen, setIsBookModalOpen] = useState(false);
    const [step, setStep] = useState(1); // 1: Info, 2: Payment, 3: Success
    const [isFavorited, setIsFavorited] = useState(false);

    useEffect(() => {
        if (!id) return;

        const fetchPropertyById = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/properties/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to retrieve property details');
                }
                const result = await response.json();
                
                // Handles data shape matching standard response wrappers ({ data: {...} })
                const targetData = result.data ? result.data : result;
                setPropertyDetails(targetData);
            } catch (err: any) {
                console.error("Error fetching property item:", err);
                setError(err.message || "An unexpected error occurred");
            } finally {
                setIsLoading(false);
            }
        };

        fetchPropertyById();
    }, [id]);

    // Loading View
    if (isLoading) {
        return (
            <div className="min-h-screen bg-white dark:bg-gray-950 flex flex-col items-center justify-center gap-4">
                <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
                <p className="text-gray-500 dark:text-gray-400 font-bold animate-pulse">Loading property specifications...</p>
            </div>
        );
    }

    // Error Guard View
    if (error || !propertyDetails) {
        return (
            <div className="min-h-screen bg-white dark:bg-gray-950 flex flex-col items-center justify-center gap-6 px-4">
                <div className="bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 p-6 rounded-3xl border border-red-100 dark:border-red-900/30 max-w-md text-center">
                    <h3 className="font-extrabold text-xl mb-2">Error Loading Property</h3>
                    <p className="text-sm">{error || "The property details could not be found."}</p>
                </div>
                <Link href="/properties" className="bg-blue-600 text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-blue-700 transition-all">
                    Back to All Properties
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white dark:bg-gray-950 pt-14 pb-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Gallery Header */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
                    <div className="lg:col-span-2 rounded-[2rem] overflow-hidden shadow-xl aspect-[16/10]">
                        <img 
                            src={propertyDetails.images?.[activeImage] || "/placeholder-property.jpg"} 
                            alt="Main View" 
                            className="w-full h-full object-cover" 
                        />
                    </div>

                    <div className="flex flex-col justify-between gap-2 lg:gap-0">
                        {!propertyDetails.images || propertyDetails.images.length <= 1 ? (
                            <div className="flex items-center justify-center h-full text-gray-500 italic">
                                <p className="text-lg border rounded-2xl p-5 w-full text-center">No More Images Available</p>
                            </div>
                        ) : (
                            propertyDetails.images.slice(0, 4).map((img, i) => (
                                <div
                                    key={i}
                                    onClick={() => setActiveImage(i)}
                                    className={`relative cursor-pointer rounded-2xl overflow-hidden h-1/4 group border-4 transition-all duration-300 ${activeImage === i ? 'border-blue-600 scale-[1.02]' : 'border-transparent'}`}
                                >
                                    <img src={img} alt={`Thumb ${i}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                                    <div className={`absolute inset-0 bg-black/20 ${activeImage === i ? 'hidden' : 'block'}`}></div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Details */}
                    <div className="lg:col-span-2 space-y-12">
                        <div>
                            <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                                <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">{propertyDetails.title}</h1>
                                <div className="flex gap-2">
                                    <button onClick={() => setIsFavorited(!isFavorited)} className={`p-3 rounded-full border transition-all ${isFavorited ? 'bg-red-50 border-red-200 text-red-500' : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 text-gray-400 hover:text-red-500'}`}>
                                        <Heart className={`w-6 h-6 ${isFavorited ? 'fill-current' : ''}`} />
                                    </button>
                                    <button className="p-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-full text-gray-400 hover:text-blue-500 transition-all">
                                        <Share2 className="w-6 h-6" />
                                    </button>
                                </div>
                            </div>
                            <div className="flex items-center text-gray-500 gap-2 mb-8">
                                <MapPin className="w-4 h-4 text-blue-600" />
                                <span>{propertyDetails.location}</span>
                                <span className="mx-2 text-gray-300">|</span>
                                <div className="flex items-center text-amber-500">
                                    <Star className="w-4 h-4 fill-current mr-1" />
                                    <span className="font-bold">{propertyDetails.rating || '4.9'} ({propertyDetails.reviews?.length || 0} reviews)</span>
                                </div>
                            </div>

                            {/* Quick Features */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 p-8 bg-blue-50 dark:bg-blue-900/10 rounded-3xl border border-blue-100 dark:border-blue-900/30">
                                <div className="flex items-center gap-3">
                                    <Bed className="w-6 h-6 text-blue-600" />
                                    <div>
                                        <p className="text-xs text-gray-500 font-medium">Bedrooms</p>
                                        <p className="font-bold text-gray-900 dark:text-white">{propertyDetails.beds}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Bath className="w-6 h-6 text-blue-600" />
                                    <div>
                                        <p className="text-xs text-gray-500 font-medium">Bathrooms</p>
                                        <p className="font-bold text-gray-900 dark:text-white">{propertyDetails.baths}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Maximize className="w-6 h-6 text-blue-600" />
                                    <div>
                                        <p className="text-xs text-gray-500 font-medium">Living Space</p>
                                        <p className="font-bold text-gray-900 dark:text-white">{propertyDetails.size} sqft</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <TrendingUp className="w-6 h-6 text-blue-600" />
                                    <div>
                                        <p className="text-xs text-gray-500 font-medium">Property Type</p>
                                        <p className="font-bold text-gray-900 dark:text-white">{propertyDetails.type}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="space-y-4">
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Property Description</h3>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
                                {propertyDetails.description}
                            </p>
                        </div>

                        {/* Amenities */}
                        <div className="space-y-6">
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Home Amenities</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {propertyDetails.amenities?.map((feat, i) => (
                                    <div key={i} className="flex gap-2 text-gray-600 dark:text-gray-400">
                                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                                        <span>{feat}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="space-y-6">
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Extra Features</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {propertyDetails.extraFeatures?.map((feat, i) => (
                                    <div key={i} className="flex  gap-2 text-gray-600 dark:text-gray-400">
                                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                                        <span>{feat}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Review Section */}
                        <div className="space-y-8 pt-12 border-t border-gray-100 dark:border-gray-800">
                            <div className="flex justify-between items-center">
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">User Reviews</h3>
                                <p className="text-blue-600 font-semibold cursor-pointer">Write a review</p>
                            </div>

                            

                            {/* Review Form UI */}
                            <ReviewSection reviews={propertyDetails.reviews} />


                        </div>
                    </div>

                    {/* Pricing & Booking Card (Sticky) */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-32 bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-xl overflow-hidden">
                            <div className="p-8 space-y-6">
                                <div>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-4xl font-extrabold text-blue-600">${propertyDetails.price}</span>
                                        <span className="text-gray-500 text-lg">/ Month</span>
                                    </div>
                                    <p className="text-sm text-green-600 font-semibold mt-1">Available Immediately</p>
                                </div>

                                <div className="space-y-4">
                                    <button
                                        onClick={() => {
                                            setStep(1);
                                            setIsBookModalOpen(true);
                                        }}
                                        className="w-full bg-blue-600 text-white py-5 rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/30 active:scale-95"
                                    >
                                        Book Now
                                    </button>
                                    <button className="w-full bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 py-4 rounded-2xl font-semibold hover:bg-gray-100 transition-all">
                                        Contact Owner
                                    </button>
                                </div>

                                {propertyDetails.ownerInfo && (
                                    <div className="pt-6 border-t border-gray-50 dark:border-gray-800 space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                                                    {propertyDetails.ownerInfo.name?.[0]}
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-gray-900 dark:text-white text-sm flex items-center gap-1">
                                                        {propertyDetails.ownerInfo.name}
                                                        
                                                    </h4>
                                                </div>
                                            </div>
                                            <button className="text-blue-600 p-2 hover:bg-blue-50 rounded-lg"><ChevronRight className="w-5 h-5" /></button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Booking Modal & Flow */}
            <AnimatePresence>
                {isBookModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsBookModalOpen(false)}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        ></motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative bg-white dark:bg-gray-950 w-full max-w-xl rounded-[2.5rem] shadow-2xl overflow-hidden text-gray-900 dark:text-gray-100"
                        >
                            <div className="p-10">
                                <div className="flex justify-between items-center mb-10">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-400'}`}>1</div>
                                        <div className={`w-12 h-[2px] ${step >= 2 ? 'bg-blue-600' : 'bg-gray-100'}`}></div>
                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-400'}`}>2</div>
                                        <div className={`w-12 h-[2px] ${step >= 3 ? 'bg-blue-600' : 'bg-gray-100'}`}></div>
                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm ${step >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-400'}`}>3</div>
                                    </div>
                                    <button onClick={() => setIsBookModalOpen(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-all">
                                        <X className="w-6 h-6" />
                                    </button>
                                </div>

                                {step === 1 && (
                                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                        <div>
                                            <h2 className="text-3xl font-extrabold mb-2 text-gray-900 dark:text-white">Booking Inquiry</h2>
                                            <p className="text-gray-500">Please provide your details to proceed with the booking.</p>
                                        </div>
                                        <div className="grid grid-cols-1 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold flex items-center gap-2"><Calendar className="w-4 h-4 text-blue-600" /> Preferred Move-in Date</label>
                                                <input type="date" className="w-full p-4 bg-gray-50 dark:bg-gray-900 border-none rounded-2xl outline-none focus:ring-2 focus:ring-blue-600" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold flex items-center gap-2"><User className="w-4 h-4 text-blue-600" /> Contact Number</label>
                                                <input type="tel" placeholder="+1 (212) 000-0000" className="w-full p-4 bg-gray-50 dark:bg-gray-900 border-none rounded-2xl outline-none focus:ring-2 focus:ring-blue-600" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold">Notes for Owner</label>
                                                <textarea placeholder="Anything else we should know?" className="w-full p-4 bg-gray-50 dark:bg-gray-900 border-none rounded-2xl h-24 outline-none focus:ring-2 focus:ring-blue-600"></textarea>
                                            </div>
                                        </div>
                                        <button onClick={() => setStep(2)} className="w-full bg-blue-600 text-white py-5 rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all">
                                            Proceed to Payment
                                        </button>
                                    </div>
                                )}

                                {step === 2 && (
                                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                        <div>
                                            <h2 className="text-3xl font-extrabold mb-2 text-gray-900 dark:text-white">Secure Payment</h2>
                                            <p className="text-gray-500">Complete your reservation with a secure payment.</p>
                                        </div>
                                        <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-3xl space-y-4">
                                            <div className="flex justify-between font-bold">
                                                <span>One-time Platform Fee</span>
                                                <span>$150.00</span>
                                            </div>
                                            <div className="flex justify-between font-bold">
                                                <span>First Month Rent</span>
                                                <span>${propertyDetails.price}.00</span>
                                            </div>
                                            <div className="border-t border-gray-200 dark:border-gray-800 pt-4 flex justify-between text-xl font-extrabold text-blue-600">
                                                <span>Total Due</span>
                                                <span>${propertyDetails.price + 150}.00</span>
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <div className="relative">
                                                <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                                <input type="text" placeholder="Card number" className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-900 border-none rounded-2xl outline-none" />
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <input type="text" placeholder="MM/YY" className="w-full p-4 bg-gray-50 dark:bg-gray-900 border-none rounded-2xl outline-none" />
                                                <input type="text" placeholder="CVC" className="w-full p-4 bg-gray-50 dark:bg-gray-900 border-none rounded-2xl outline-none" />
                                            </div>
                                        </div>
                                        <button onClick={() => setStep(3)} className="w-full bg-blue-600 text-white py-5 rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-2">
                                            Pay <span className="font-extrabold">${propertyDetails.price + 150}</span>
                                        </button>
                                    </div>
                                )}

                                {step === 3 && (
                                    <div className="text-center space-y-8 py-10 animate-in fade-in zoom-in duration-700">
                                        <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 scale-110">
                                            <CheckCircle2 className="w-12 h-12" />
                                        </div>
                                        <div>
                                            <h2 className="text-3xl font-extrabold mb-4 text-gray-900 dark:text-white">Booking Successful!</h2>
                                            <p className="text-gray-500 max-w-sm mx-auto leading-relaxed">
                                                Your booking request has been sent to {propertyDetails.ownerInfo?.name || 'the owner'}. You will receive an update in your dashboard shortly.
                                            </p>
                                        </div>
                                        <Link
                                            href="/dashboard/tenant"
                                            onClick={() => setIsBookModalOpen(false)}
                                            className="inline-block w-full bg-blue-600 text-white py-5 rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all"
                                        >
                                            Go to My Bookings
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}