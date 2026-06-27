"use client";

import React, { useState } from 'react';
import { Star, Send, Loader2 } from 'lucide-react';
import { authClient } from '@/lib/auth-client';
import { useParams } from 'next/navigation';
import { formatReadableDate } from '@/app/dashboard/admin/PropertiesTab';
import { useRouter } from 'next/navigation';

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

const ReviewSection = ({ reviews: initialReviews }: ReviewSectionProps) => {
    const router = useRouter();
    const { id: propertyId } = useParams();
    const { data: session } = authClient.useSession();
    
    // Manage local review updates immediately after posting
    const [reviews, setReviews] = useState<Review[]>(initialReviews);
    const [rating, setRating] = useState(0);
    const [hoveredRating, setHoveredRating] = useState(0);
    const [reviewText, setReviewText] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const userRole = session?.user?.role?.toLowerCase();
    const isTenant = userRole === 'tenant';

    

    const handleSubmitReview = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!reviewText.trim()) return alert("Please type out a review description.");
        if (rating === 0) return alert("Please select a star rating.");
        if (!session?.user) return alert("You must be logged in to execute this action.");

        setIsSubmitting(true);

        // Construct payload structurally matching your requirements
        const reviewPayload = {
            review: reviewText.trim(),
            user: session.user.name || "Anonymous",
            userId: session.user.id,
            date: new Date().toISOString(), // Standard JSON safe ISO timestamp string
            rating: rating,
            email: session.user.email
        };

        try {
            const token = session?.session?.token;
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/properties/review/${propertyId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    // Appends standard Bearer Authorization structure containing your token string
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(reviewPayload)
            });

            if (!response.ok) {
                throw new Error('Failed to post review');
            }

            const result = await response.json();
            console.log('review result: ', result);
            setReviews(result.data)

            // Clear input forms
            setReviewText('');
            setRating(0);
router.refresh()
            // Optimistically update the local view list with the newly stored document row
           

        } catch (error) {
            console.error("Error submitting review:", error);
            alert("Could not post review. Please check connection logs.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            {/* Conditional Review Form Block: Restricted to logged-in Tenants only */}
            {isTenant && (
                <form 
                    onSubmit={handleSubmitReview}
                    className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 p-8 space-y-6 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-300"
                >
                    <h4 className="font-bold text-lg text-gray-900 dark:text-white">Leave a Review</h4>
                    
                    {/* Interactive Star Selection */}
                    <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((starValue) => (
                            <button
                                type="button"
                                key={starValue}
                                onMouseEnter={() => setHoveredRating(starValue)}
                                onMouseLeave={() => setHoveredRating(0)}
                                onClick={() => setRating(starValue)}
                                className="focus:outline-none transition-transform active:scale-110"
                            >
                                <Star
                                    className={`w-6 h-6 cursor-pointer transition-colors ${
                                        starValue <= (hoveredRating || rating)
                                            ? 'text-amber-500 fill-amber-500'
                                            : 'text-gray-200 dark:text-gray-700'
                                    }`}
                                />
                            </button>
                        ))}
                    </div>

                    <textarea
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        placeholder="Share your experience..."
                        disabled={isSubmitting}
                        className="w-full p-4 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-none rounded-xl h-32 focus:ring-2 focus:ring-blue-600 outline-none transition-all disabled:opacity-60"
                    ></textarea>

                    <button 
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all flex items-center gap-2 disabled:opacity-60 disabled:hover:bg-blue-600 active:scale-95 shadow-md shadow-blue-500/10"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                <span>Posting...</span>
                            </>
                        ) : (
                            <>
                                <Send className="w-4 h-4" /> 
                                <span>Submit Review</span>
                            </>
                        )}
                    </button>
                </form>
            )}

            {/* Display Reviews Feed */}
            <div className="space-y-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                {reviews && reviews.length > 0 ? (
                    reviews.map((rev:any) => (
                        <div key={rev._id} className="bg-gray-50 dark:bg-gray-900 p-6 rounded-2xl space-y-4 border border-transparent dark:border-gray-800">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/40 rounded-full flex items-center justify-center font-bold text-blue-600 dark:text-blue-400">
                                        {rev.user?.[0] || 'U'}
                                    </div>
                                    <div>
                                        <p className="font-bold text-sm text-gray-900 dark:text-gray-100">{rev.user}</p>
                                        <p className="font-extralight text-xs text-gray-900 dark:text-gray-100">{rev.email}</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">{formatReadableDate(rev.date)}</p>
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
                            <p className="text-gray-600 dark:text-gray-400 italic">"{rev.review}"</p>
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