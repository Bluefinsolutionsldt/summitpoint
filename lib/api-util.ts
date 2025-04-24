import { NextResponse } from 'next/server';

// API authorization token
export const AUTH_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoibXVzc2FraXNlbmFAZ21haWwuY29tIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiUGFydGljaXBhbnQiLCJzdWIiOiJiZjc1Y2I2My0yNGFmLTRjMzktOGQwYS0yOGJlYWNiNDYxNDkiLCJuYmYiOiIxNzQ1NDExNzg0IiwiZXhwIjoiMTc3Njk0Nzc4NCJ9.4zB6qfDupHwEn3aSMrrMdRxOGdnoWl4zlL1KZEilr30';

// API base URL
export const API_BASE_URL = 'https://summitpoint.co.tz';

// Headers with authorization
export const getAuthHeaders = () => ({
  'Authorization': `Bearer ${AUTH_TOKEN}`
});

// Function to fetch all events
export const fetchEvents = async () => {
  try {
    // First try our own API endpoint which handles authentication
    try {
      const response = await fetch(`/api/events`, {
        next: { revalidate: 0 }
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log("Events data fetched successfully from internal API:", data.length);
        return data;
      } else {
        console.error("Failed to fetch events from internal API:", response.status);
      }
    } catch (internalError) {
      console.error('Internal API call failed:', internalError);
    }
    
    // Second attempt - direct external API call
    try {
      const response = await fetch(`${API_BASE_URL}/api/v2/events`, {
        headers: getAuthHeaders(),
        next: { revalidate: 0 }
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log("Events data fetched successfully from external API:", data.length);
        return data;
      } else {
        console.error("Failed to fetch events from external API:", response.status);
      }
    } catch (directError) {
      console.error('Direct external API call failed:', directError);
    }
    
    // Fallback - return sample data for development
    console.log('Using fallback sample data');
    return [
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
        "organization": {
          "id": 49,
          "name": "Uganda National Oil Company",
          "address": "Plot 15 Yusuf Lule Rd, Kampala, Uganda",
          "phone": "+256 312 444 600",
          "logo": null
        }
      }
    ];
  } catch (error) {
    console.error('Error fetching events:', error);
    return []; // Return empty array instead of re-throwing
  }
};

// Function to fetch an event by ID
export const fetchEventById = async (eventId: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v2/events/${eventId}`, {
      headers: getAuthHeaders(),
      next: { revalidate: 3600 } // Cache for 1 hour
    });
    
    if (!response.ok) {
      // Return null instead of throwing for 400/404 errors
      if (response.status === 400 || response.status === 404) {
        console.log(`Event ${eventId} not found: ${response.status}`);
        return null;
      }
      throw new Error(`Failed to fetch event: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching event:', error);
    return null; // Return null instead of re-throwing
  }
};

// Function to fetch an image with multiple path fallbacks
export const fetchImageWithFallbacks = async (
  paths: string[],
  errorMessage: string
) => {
  for (const path of paths) {
    try {
      const imageUrl = `${API_BASE_URL}${path}`;
      const imageResponse = await fetch(imageUrl, {
        headers: getAuthHeaders()
      });
      
      if (imageResponse.ok) {
        const imageData = await imageResponse.arrayBuffer();
        const contentType = imageResponse.headers.get('content-type') || 'image/jpeg';
        
        return {
          data: imageData,
          contentType
        };
      }
    } catch (error) {
      console.error(`Error fetching from ${path}:`, error);
      // Continue to the next path
    }
  }
  
  // If we reach here, none of the paths worked
  throw new Error(errorMessage);
};

// Direct image fetching approach without needing event data first
export const fetchDirectImage = async (eventId: string, imageType: 'banner' | 'thumbnail') => {
  const paths = [
    `/api/v2/events/${imageType}/${eventId}`,
    `/api/v2/events/${imageType === 'banner' ? 'image' : 'thumb'}/${eventId}`
  ];
  
  for (const path of paths) {
    try {
      const imageUrl = `${API_BASE_URL}${path}`;
      const imageResponse = await fetch(imageUrl, {
        headers: getAuthHeaders()
      });
      
      if (imageResponse.ok) {
        const imageData = await imageResponse.arrayBuffer();
        const contentType = imageResponse.headers.get('content-type') || 'image/jpeg';
        
        return {
          data: imageData,
          contentType
        };
      }
    } catch (error) {
      console.error(`Error direct fetching from ${path}:`, error);
      // Continue to the next path
    }
  }
  
  // If we reach here, none of the paths worked
  return null;
};

// Generic handler for serving images with error handling
export const handleImageRequest = async (
  eventId: string,
  imageProperty: 'bannerImage' | 'bannerThumbnail',
  pathGenerator: (filename: string, id: string) => string[]
) => {
  try {
    // Try direct image fetching first
    const imageType = imageProperty === 'bannerImage' ? 'banner' : 'thumbnail';
    const directResult = await fetchDirectImage(eventId, imageType);
    
    if (directResult) {
      return new NextResponse(directResult.data, {
        headers: {
          'Content-Type': directResult.contentType,
          'Cache-Control': 'public, max-age=86400' // Cache for 24 hours
        }
      });
    }
    
    // If direct approach failed, try to get the event data
    const eventData = await fetchEventById(eventId);
      
    if (eventData && eventData[imageProperty]) {
      // Generate potential paths
      const filename = eventData[imageProperty];
      const paths = pathGenerator(filename, eventId);
      
      try {
        // Try to fetch the image
        const { data, contentType } = await fetchImageWithFallbacks(
          paths,
          `Could not retrieve ${imageProperty} from any known path`
        );
        
        // Return the image data
        return new NextResponse(data, {
          headers: {
            'Content-Type': contentType,
            'Cache-Control': 'public, max-age=86400' // Cache for 24 hours
          }
        });
      } catch (imageError: unknown) {
        const errorMessage = imageError instanceof Error ? imageError.message : 'Unknown error';
        console.log(`Falling back to default image: ${errorMessage}`);
        // Continue to fallback
      }
    }
    
    // Final fallback - return a default image
    return new Response(null, {
      status: 307, // Temporary redirect
      headers: {
        'Location': '/side.png', // Redirect to default image
        'Cache-Control': 'public, max-age=3600' // Cache for 1 hour
      }
    });
  } catch (error) {
    console.error(`Error handling ${imageProperty} request:`, error);
    
    // Return default image instead of error
    return new Response(null, {
      status: 307, // Temporary redirect
      headers: {
        'Location': '/side.png', // Redirect to default image
        'Cache-Control': 'public, max-age=3600' // Cache for 1 hour
      }
    });
  }
}; 