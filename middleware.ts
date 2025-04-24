import { auth } from "@/auth";
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Note: Server-side middleware cannot access localStorage,
// so we can't enforce auth redirects here with our localStorage approach.
// These would normally be handled client-side in the components.

// Auth wrapper for middleware
export default auth(function middleware(request) {
  // Just pass through all requests - auth checks will be handled by NextAuth
  return NextResponse.next();
});

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}; 