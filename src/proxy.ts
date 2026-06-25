import { NextResponse } from "next/server";
import { headers } from "next/headers";
import type { NextRequest } from 'next/server';
import { auth } from "./lib/auth"; // Ensure this path points to your server auth instance

export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const session = await auth.api.getSession({
        headers: await headers()
    });

    // 1. Authentication Check: If no session, bounce to login
    if (!session || !session.user) {
        const loginUrl = new URL('/login', request.url);
        loginUrl.searchParams.set('callbackUrl', pathname + request.nextUrl.search);
        return NextResponse.redirect(loginUrl);
    }

    // 2. Authorization Check: Role-based routing protection
    if (pathname.startsWith("/dashboard")) {
        const userRole = session.user.role?.toLowerCase(); // e.g., 'tenant', 'owner', 'admin'

        // Guard Admin Dashboard
        if (pathname.startsWith("/dashboard/admin") && userRole !== "admin") {
            return NextResponse.redirect(new URL(`/dashboard/${userRole}`, request.url));
        }

        // Guard Owner Dashboard
        if (pathname.startsWith("/dashboard/owner") && userRole !== "owner" && userRole !== "admin") {
            return NextResponse.redirect(new URL(`/dashboard/${userRole}`, request.url));
        }

        // Guard Tenant Dashboard
        if (pathname.startsWith("/dashboard/tenant") && userRole !== "tenant" && userRole !== "admin") {
            return NextResponse.redirect(new URL(`/dashboard/${userRole}`, request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    // We target all sub-routes of /dashboard and sub-routes of /properties
    matcher: ["/dashboard/:path*", "/properties/:path+"], 
};