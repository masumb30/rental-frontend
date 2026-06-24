'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // Added for routing redirection
import { toast, ToastContainer } from 'react-toastify';       // Added for alert management
import { authClient } from '@/lib/auth-client';

export default function SignupPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false); // Global component submission state
    
    // Single controlled state for all form data, initialized with test defaults
    const [formData, setFormData] = useState({
        name: 'John Doe',
        email: 'john.doe@example.com',
        photo: 'https://example.com/image.png',
        password: 'password1234',
        role: 'owner'
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRoleChange = (newRole: 'owner' | 'tenant') => {
        if (isLoading) return; // Prevent role change during submission
        setFormData({ ...formData, role: newRole });
    };

    const handleGoogleLogin = () => {
        if (isLoading) return;
        console.log('Google login clicked');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const { data, error } = await authClient.signUp.email({
                name: formData.name,
                email: formData.email,
                password: formData.password,
                image: formData.photo,
                role: formData.role
            });

            if (error) {
                // If Better Auth returns a server-side authentication validation error
                toast.error(error.message || 'Signup failed. Please try again.');
            } else {
                // Flash success notification and immediately transition page contexts
                toast.success('Account created successfully! Redirecting...');
                router.push('/login');
            }
        } catch (err) {
            // Fallback catch block for network drops or infrastructure timeouts
            toast.error('An unexpected connection error occurred.');
            console.error("Signup submission failure:", err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0B0F19] px-4">
            <ToastContainer autoClose={1500} position="top-right" theme="dark" />
            <div className="w-full max-w-md bg-[#151D30] p-8 my-4 rounded-2xl border border-gray-800 shadow-2xl">
                <div className="text-center mb-6">
                    <h2 className="text-3xl font-bold text-white tracking-tight">Create Account</h2>
                    <p className="text-sm text-gray-400 mt-1">Sign up to get started</p>
                </div>

                {/* Google Social Login */}
                <button
                    onClick={handleGoogleLogin}
                    disabled={isLoading}
                    type="button"
                    className="cursor-pointer w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-700 rounded-xl text-sm font-medium text-gray-200 bg-[#1E293B] hover:bg-[#273549] transition-all mb-6 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <svg className="h-5 w-5" viewBox="0 0 24 24">
                        <path fill="#EA4335" d="M12 5.04c1.64 0 3.12.56 4.28 1.67l3.2-3.2C17.52 1.58 14.97 1 12 1 7.21 1 3.14 3.74 1.24 7.72l3.82 2.96C6 7.42 8.78 5.04 12 5.04z" />
                        <path fill="#4285F4" d="M23.49 12.27c0-.81-.07-1.59-.2-2.36H12v4.46h6.44c-.28 1.48-1.12 2.73-2.38 3.58l3.69 2.86c2.16-1.99 3.74-4.92 3.74-8.54z" />
                        <path fill="#FBBC05" d="M5.06 14.68c-.25-.72-.39-1.5-.39-2.31s.14-1.59.39-2.31L1.24 7.09C.44 8.67 0 10.44 0 12.31s.44 3.64 1.24 5.22l3.82-2.85z" />
                        <path fill="#34A853" d="M12 23c3.24 0 5.97-1.07 7.96-2.91l-3.69-2.86c-1.12.75-2.54 1.19-4.27 1.19-3.22 0-6-2.38-6.94-5.64L1.24 15.64C3.14 19.62 7.21 23 12 23z" />
                    </svg>
                    <span>Continue with Google</span>
                </button>

                <div className="relative my-5">
                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-800"></div></div>
                    <div className="relative flex justify-center text-sm"><span className="px-3 bg-[#151D30] text-gray-500">or</span></div>
                </div>

                {/* Signup Form */}
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Name</label>
                        <input
                            name="name"
                            type="text"
                            required
                            disabled={isLoading}
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border border-gray-800 bg-[#0B0F19] text-gray-100 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-sm disabled:opacity-50"
                            placeholder="John Doe"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Email Address</label>
                        <input
                            name="email"
                            type="email"
                            required
                            disabled={isLoading}
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border border-gray-800 bg-[#0B0F19] text-gray-100 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-sm disabled:opacity-50"
                            placeholder="you@example.com"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Photo URL</label>
                        <input
                            name="photo"
                            type="text"
                            required
                            disabled={isLoading}
                            value={formData.photo}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border border-gray-800 bg-[#0B0F19] text-gray-100 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-sm disabled:opacity-50"
                            placeholder="https://imgbb.com/your-photo"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Password</label>
                        <input
                            name="password"
                            type="password"
                            required
                            disabled={isLoading}
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border border-gray-800 bg-[#0B0F19] text-gray-100 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-sm disabled:opacity-50"
                            placeholder="••••••••"
                        />
                    </div>

                    {/* Role Toggle Switch Container */}
                    <div className={`flex items-center gap-2 rounded-xl bg-[#0B0F19] p-1.5 border border-gray-800 ${isLoading ? 'opacity-50' : ''}`}>
                        <button
                            type="button"
                            disabled={isLoading}
                            onClick={() => handleRoleChange('owner')}
                            className={`flex-1 rounded-lg py-2 text-sm font-medium transition-all duration-200 ${
                                isLoading ? 'cursor-not-allowed' : 'cursor-pointer'
                            } ${
                                formData.role === 'owner'
                                    ? 'bg-indigo-600 text-white shadow-md'
                                    : 'text-gray-400 hover:text-gray-200'
                            }`}
                        >
                            Owner
                        </button>

                        <button
                            type="button"
                            disabled={isLoading}
                            onClick={() => handleRoleChange('tenant')}
                            className={`flex-1 rounded-lg py-2 text-sm font-medium transition-all duration-200 ${
                                isLoading ? 'cursor-not-allowed' : 'cursor-pointer'
                            } ${
                                formData.role === 'tenant'
                                    ? 'bg-indigo-600 text-white shadow-md'
                                    : 'text-gray-400 hover:text-gray-200'
                            }`}
                        >
                            Tenant
                        </button>
                    </div>

                    {/* Submit Button with Loading Spinner */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="cursor-pointer w-full flex items-center justify-center gap-2 py-3 px-4 mt-2 rounded-xl bg-linear-to-r from-indigo-500 to-purple-600 text-white font-medium hover:from-indigo-600 hover:to-purple-700 transition-all shadow-lg shadow-indigo-500/10 disabled:opacity-70 disabled:from-indigo-500 disabled:to-purple-600 ${
                            isLoading ? 'cursor-not-allowed' : 'cursor-pointer'
                        }"
                    >
                        {isLoading ? (
                            <>
                                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                                <span>Creating Account...</span>
                            </>
                        ) : (
                            <span>Sign Up</span>
                        )}
                    </button>
                </form>

                <p className="text-center text-sm text-gray-400 mt-5">
                    Already have an account?{' '}
                    <Link href="/login" className={`text-indigo-400 hover:underline ${isLoading ? 'pointer-events-none opacity-50' : ''}`}>Sign In</Link>
                </p>
            </div>
        </div>
    );
}