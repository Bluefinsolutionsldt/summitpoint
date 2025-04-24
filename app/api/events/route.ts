import { NextResponse } from 'next/server';
import { API_BASE_URL, getAuthHeaders } from '@/lib/api-util';

export async function GET() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v2/events`, {
      headers: getAuthHeaders(),
      next: { revalidate: 600 } // Cache for 10 minutes
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch events from external API' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 