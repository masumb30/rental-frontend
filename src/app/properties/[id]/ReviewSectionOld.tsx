"use client";

import React, { useState } from 'react';
import { Star, Send } from 'lucide-react';
import { authClient } from '@/lib/auth-client';

interface Review {
    id: string;
    name: string;
    date: string;
    rating: number;
    text: string;
}

interface ReviewSectionProps {
    reviews: Review[];
}

const ReviewSection = ({ reviews }: ReviewSectionProps) => {
    const { data: session } = authClient.useSession();
    const [rating, setRating] = useState(0);
    const [hoveredRating, setHoveredRating] = useState(0);
    const [reviewText, setReviewText] = useState('');

    // Determine authorization thresholds based on standard roles
    const userRole = session?.user?.role?.toLowerCase() || 'guest';
    const isTenant = userRole === 'tenant';

    return (
        <>
            {/* Conditional Review Form Block: Restricted to logged-in Tenants only */}
            {isTenant && (
                <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 p-8 space-y-6 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <h4 className="font-bold text-lg text-gray-900 dark:text-white">Leave a Review</h4>
                    
                    {/* Interactive Star Selection */}
                    <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((starValue) => (
                            <Star
                                key={starValue}
                                onMouseEnter={() => setHoveredRating(starValue)}
                                onMouseLeave={() => setHoveredRating(0)}
                                onClick={() => setRating(starValue)}
                                className={`w-6 h-6 cursor-pointer transition-colors ${
                                    starValue <= (hoveredRating || rating)
                                        ? 'text-amber-500 fill-amber-500'
                                        : 'text-gray-200 dark:text-gray-700'
                                }`}
                            />
                        ))}
                    </div>

                    <textarea
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        placeholder="Share your experience..."
                        className="w-full p-4 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-none rounded-xl h-32 focus:ring-2 focus:ring-blue-600 outline-none transition-all"
                    ></textarea>

                    <button className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all flex items-center gap-2 active:scale-95 shadow-md shadow-blue-500/10">
                        <Send className="w-4 h-4" /> Submit Review
                    </button>
                </div>
            )}

            {/* Display Reviews Feed (Visible to Admins, Owners, and Tenants) */}
            <div className="space-y-6">
                {reviews && reviews.length > 0 ? (
                    reviews.map((rev) => (
                        <div key={rev.id} className="bg-gray-50 dark:bg-gray-900 p-6 rounded-2xl space-y-4 border border-transparent dark:border-gray-800">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/40 rounded-full flex items-center justify-center font-bold text-blue-600 dark:text-blue-400">
                                        {rev.name?.[0] || 'U'}
                                    </div>
                                    <div>
                                        <p className="font-bold text-sm text-gray-900 dark:text-gray-100">{rev.name}</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">{rev.date}</p>
                                    </div>
                                </div>
                                <div className="flex text-amber-500">
                                    {[...Array(5)].map((_, i) => (
                                        <Star 
                                            key={i} 
                                            className={`w-4 h-4 ${i < (rev.rating || 5) ? 'fill-current' : 'text-gray-200 dark:text-gray-800'}`} 
                                        />
                                    ))}
                                </div>
                            </div>
                            <p className="text-gray-600 dark:text-gray-400 italic">"{rev.text}"</p>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-8 border border-dashed border-gray-200 dark:border-gray-800 rounded-2xl">
                        <p className="text-gray-500 dark:text-gray-400 text-sm">No reviews posted yet.</p>
                    </div>
                )}
            </div>
        </>
    );
};

export default ReviewSection;