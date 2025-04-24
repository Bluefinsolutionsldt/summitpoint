import { NextRequest, NextResponse } from 'next/server';
import { fetchEventById } from '@/lib/api-util';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const eventData = await fetchEventById(id);
    return NextResponse.json(eventData);
  } catch (error) {
    console.error('Error fetching event:', error);
    return NextResponse.json(
      { error: 'Failed to fetch event' },
      { status: 500 }
    );
  }
} 