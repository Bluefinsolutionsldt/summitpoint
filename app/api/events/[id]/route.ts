import { NextRequest, NextResponse } from 'next/server';
import { API_BASE_URL, getAuthHeaders, shouldUseSampleData } from '@/lib/api-util';

// Sample data as a fallback
const getSampleEventById = (id: string | number): any => {
  const eventId = typeof id === 'string' ? parseInt(id, 10) : id;
  
  const sampleEvents = [
    {
      "id": 177,
      "name": "INNOVATION WEEK TANZANIA 2025",
      "startDate": "2025-05-12T00:00:00",
      "endDate": "2025-05-16T00:00:00",
      "description": "Innovation for a Resilient and Inclusive Future",
      "city": "Dar es Salaam",
      "venue": "Julius Nyerere International Convention Centre",
      "bannerImage": "93537e79-63ea-457e-a343-a168cce4ee2f.png",
      "bannerThumbnail": "93537e79-63ea-457e-a343-a168cce4ee2f_thumb.png",
      "themeColor": "#0C80B3",
      "latitude": -6.812173,
      "longitude": 39.288505,
      "isPrivate": false,
      "signatureRequired": false,
      "accessCode": null,
      "organization": {
        "id": 45,
        "name": "ICT COMMISSION",
        "address": "14 Jamhuri Street",
        "phone": "0736848444",
        "logo": null
      }
    },
    {
      "id": 158,
      "name": "EAST AFRICA PHILANTHROPY CONFERENCE",
      "startDate": "2025-06-11T00:00:00",
      "endDate": "2025-06-13T00:00:00",
      "description": "Strengthening Philanthropic Partnerships Across East Africa",
      "city": "Kigali",
      "venue": "Kigali Serena Hotel",
      "bannerImage": "c19f017d-5047-40f6-8906-cef5dac8ff0c.jpg",
      "bannerThumbnail": "c19f017d-5047-40f6-8906-cef5dac8ff0c_thumb.jpg",
      "themeColor": "#446A9F",
      "latitude": -1.9563339,
      "longitude": 30.0627322,
      "isPrivate": false,
      "signatureRequired": false,
      "accessCode": null,
      "organization": {
        "id": 48,
        "name": "East Africa Philanthropy",
        "address": null,
        "phone": null,
        "logo": null
      }
    },
    {
      "id": 176,
      "name": "Uganda Energy Summit 2025",
      "startDate": "2025-04-02T00:00:00",
      "endDate": "2025-04-04T00:00:00",
      "description": "Fostering economic growth through affordable energy",
      "city": "Kampala",
      "venue": "Kampala Serena Hotel",
      "bannerImage": "ca1063c7-5002-49bf-aa9f-837528b8d5d4.jpg", 
      "bannerThumbnail": "ca1063c7-5002-49bf-aa9f-837528b8d5d4_thumb.jpg",
      "themeColor": "#0E273D",
      "latitude": 0.3136,
      "longitude": 32.5811,
      "isPrivate": false,
      "signatureRequired": false,
      "accessCode": null,
      "organization": {
        "id": 49,
        "name": "Uganda National Oil Company",
        "address": "Plot 15 Yusuf Lule Rd, Kampala, Uganda",
        "phone": "+256 312 444 600",
        "logo": null
      }
    }
  ];
  
  const matchingEvent = sampleEvents.find(event => event.id === eventId);
  return matchingEvent || sampleEvents[0]; // Return first event as fallback
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  console.log(`API route handling request for event ${id}`);
  
  // If we should use sample data, return sample data immediately
  if (shouldUseSampleData()) {
    console.log(`Using sample data for event ${id} in route handler due to config`);
    return NextResponse.json(getSampleEventById(id));
  }
  
  try {
    // Make direct API call first
    try {
      console.log(`Attempting direct API call in route handler for event ${id}`);
      const response = await fetch(`${API_BASE_URL}/api/v2/events/${id}`, {
        headers: getAuthHeaders(),
        next: { revalidate: 3600 } // Cache for 1 hour
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log(`Event ${id} fetched successfully in route handler`);
        return NextResponse.json(data);
      } else {
        console.error(`Failed to fetch event from API: ${response.status}`);
      }
    } catch (fetchError) {
      console.error('Fetch error in route handler:', fetchError);
    }
    
    // If API call failed, return sample data as fallback
    console.log(`Returning sample data for event ${id} after failed API call`);
    return NextResponse.json(getSampleEventById(id));
  } catch (error) {
    console.error('Error in event route handler:', error);
    
    // Always provide fallback data
    console.log(`Returning sample data for event ${id} after error`);
    return NextResponse.json(getSampleEventById(id));
  }
} 