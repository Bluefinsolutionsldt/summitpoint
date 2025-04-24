import { NextRequest, NextResponse } from 'next/server';

export function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const eventId = searchParams.get('id') || 'eapf-16';
  
  // Redirect to the new URL format with dynamic route
  return NextResponse.redirect(new URL(`/event-detail/${eventId}`, request.url));
} 