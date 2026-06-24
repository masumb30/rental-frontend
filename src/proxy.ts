import { NextResponse } from "next/server";
import { headers } from "next/headers";
import type { NextRequest } from 'next/server'
import { auth } from "./lib/auth";

export async function proxy(request: NextRequest) {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session) {
        // return NextResponse.redirect(new URL("/login", request.url));

        const loginUrl = new URL('/login', request.url);
        // Pass the original path + search params as a query param
        loginUrl.searchParams.set('callbackUrl', request.nextUrl.pathname + request.nextUrl.search);
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*", "/properties/:path*"], // Specify the routes the middleware applies to
};