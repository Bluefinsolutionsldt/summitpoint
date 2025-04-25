import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This middleware will run for all routes
export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname;
  
  // Define paths that should be protected
  const isProtectedPath = path.startsWith('/dashboard') || path.startsWith('/event');
                         
  // Check for auth token in cookies
  const authToken = request.cookies.get('auth_token')?.value;
  
  // If it's a protected path and no auth token exists, redirect to register
  if (isProtectedPath && !authToken) {
    // Create a new URL for the redirect destination
    const redirectUrl = new URL('/register', request.url);
    
    // Return a redirect response
    return NextResponse.redirect(redirectUrl);
  }
  
  // If it's the homepage and the user is authenticated, redirect to event
  if (path === '/' && authToken) {
    return NextResponse.redirect(new URL('/event', request.url));
  }
  
  // Continue for all other requests
  return NextResponse.next();
}

// Configure the paths this middleware will run on
export const config = {
  matcher: [
    // Apply this middleware to all paths
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}; 