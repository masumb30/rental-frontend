// app/success/page.tsx
'use client';

import { useEffect, useState, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const hasRun = useRef(false); // Safeguard against React double-triggering in development mode

  const [statusMessage, setStatusMessage] = useState('Initializing verification...');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const sessionId = searchParams.get('session_id');

    if (!sessionId) {
      setError('Invalid access. No session identifier found.');
      setLoading(false);
      return;
    }

    // Stop execution if it's already run once
    if (hasRun.current) return;
    hasRun.current = true;

    const processAssignmentBooking = async () => {
      try {
        // Step 1: Fetch metadata from Stripe via our intermediate route
        setStatusMessage('Connecting with Stripe to read booking parameters...');
        const stripeRes = await fetch('/api/stripe-metadata', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId })
        });
        
        const stripeData = await stripeRes.json();
        
        if (!stripeData.success) {
          throw new Error(stripeData.error || 'Failed to resolve Stripe transaction context');
        }

        const { metadata, stripePaymentId, amountPaid } = stripeData;

        // Step 2: Make the frontend fetch request to your custom database insertion endpoint
        setStatusMessage('Stripe clear! Your booking is being handled and saved to database...');
        
        const bookingRes = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/booking/createbooking`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: metadata?.userId,
            userName: metadata?.userName,
            propertyOwner: metadata?.propertyOwner,
            propertyOwnerId: metadata?.propertyOwnerId,
            propertyId: metadata?.propertyId,
            moveInDate: metadata?.moveInDate,
            contactNumber: metadata?.contactNumber,
            notes: metadata?.notes,
            stripePaymentId,
            amountPaid
          })
        });

        const bookingData = await bookingRes.json();

        if (bookingRes.ok) {
          setStatusMessage('🎉 Booking successfully saved into MongoDB!');
          setLoading(false);
        } else {
          throw new Error(bookingData.error || 'Your backend rejected database insertion');
        }

      } catch (err: any) {
        console.error(err);
        setError(err.message || 'An error occurred during verification.');
        setLoading(false);
      }
    };

    processAssignmentBooking();
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center p-6">
      <div className="bg-white dark:bg-gray-900 max-w-md w-full rounded-3xl p-8 shadow-xl text-center border border-gray-100 dark:border-gray-800">
        
        {loading && !error && (
          <div className="space-y-6">
            {/* Simple Animated Spinner */}
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">Please Wait...</h2>
            <p className="text-gray-500 text-sm animate-pulse">{statusMessage}</p>
          </div>
        )}

        {!loading && !error && (
          <div className="space-y-6">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-950 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center text-3xl mx-auto">
              ✓
            </div>
            <h2 className="text-2xl font-black text-gray-900 dark:text-white">Payment Confirmed!</h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm">{statusMessage}</p>
            <Link 
              href="/" 
              className="block w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition-colors"
            >
              Return Home
            </Link>
          </div>
        )}

        {error && (
          <div className="space-y-6">
            <div className="w-16 h-16 bg-red-100 dark:bg-red-950 text-red-600 dark:text-red-400 rounded-full flex items-center justify-center text-3xl mx-auto">
              ✕
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Process Interrupted</h2>
            <p className="text-red-500 text-sm font-medium">{error}</p>
            <Link 
              href="/" 
              className="block w-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 py-4 rounded-xl font-bold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              Go Back to Properties
            </Link>
          </div>
        )}

      </div>
    </div>
  );
}