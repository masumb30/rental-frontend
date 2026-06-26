'use client';

import { authClient } from '@/lib/auth-client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { Loader2 } from 'lucide-react'; // Clean spinner icon

const RoleSwitcherButton = ({ user , setupdateOccured, updateOccured }: { user: any, setupdateOccured: any, updateOccured: any }) => {
    const router = useRouter();
    const [isPending, setIsPending] = useState(false);

    const handleRoleToggle = async (userId: string, currentRole: string) => {
        // Guard check to prevent double-submitting while loading
        if (isPending) return;

        const newRole = currentRole === 'owner' ? 'tenant' : 'owner';
        const session = await authClient.getSession();
        const token = session?.data?.session?.token;

        if (!token) {
            console.error("🔒 Unauthorized: No Better Auth session found.");
            toast.error("🔒 Unauthorized: Please log in to change user roles.");
            return;
        }

        try {
            setIsPending(true);

            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${userId}/role/${newRole}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ role: newRole }),
            });

            if (!response.ok) {
                throw new Error('Server rejected the role update configuration.');
            }

            // Success feedback
            toast.success(`Successfully updated role to ${newRole}!`);
            
            setupdateOccured(updateOccured + 1);
        } catch (error: any) {
            console.error("❌ Role update error:", error);
            toast.error(error.message || "Failed to update user role. Please try again.");
        } finally {
            setIsPending(false);
        }
    };

    const isOwner = user.role === 'owner';

    return (
        <button
            onClick={() => handleRoleToggle(user._id, user.role)}
            disabled={isPending}
            className={`text-[10px] md:text-xs font-bold px-2.5 py-1 rounded-lg transition-all flex items-center gap-1.5 ${
                isPending 
                    ? 'opacity-60 cursor-not-allowed bg-gray-100 dark:bg-gray-800 text-gray-400' 
                    : 'cursor-pointer border'
            } ${
                !isPending && (isOwner
                    ? 'border-blue-200 text-blue-500 hover:bg-blue-50 dark:border-blue-900/50 dark:hover:bg-blue-950/30'
                    : 'border-purple-200 text-purple-500 hover:bg-purple-50 dark:border-purple-900/50 dark:hover:bg-purple-950/30')
            }`}
        >
            <Loader2 className={`w-3 h-3 animate-spin ${isPending ? 'opacity-100' : 'opacity-0'}`} />
            <span>Make {isOwner ? 'Tenant' : 'Owner'}</span>
        </button>
    );
};

export default RoleSwitcherButton;