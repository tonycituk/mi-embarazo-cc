import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const publicRoutes = ['/login', '/forgot-password', '/'];   

// Middleware function to handle request
export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;  // Get the current path
    const isPublicRoute = publicRoutes.includes(path); // Check if the path is public

    const token = request.cookies.get('access_token');  // Get the token from cookies

    if ((!isPublicRoute && !token)) {
        return NextResponse.redirect(new URL('/login', request.nextUrl));
    }

    return NextResponse.next();  // Allow the request to continue if no conditions match
}

// Run the middleware function for the specified routes
export const config = {
    matcher: [
            '/doctor/:path*',
            '/admin/:path*',
    ], 
};
