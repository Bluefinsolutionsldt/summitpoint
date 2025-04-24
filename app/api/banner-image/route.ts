import { NextRequest, NextResponse } from 'next/server';
import { getAuthHeaders } from '@/lib/api-util';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const filename = searchParams.get('file');
  const isThumbnail = searchParams.get('thumbnail') === 'true';
  
  if (!filename) {
    return NextResponse.json(
      { error: 'Missing file parameter' },
      { status: 400 }
    );
  }

  try {
    // Determine if we're looking for a thumbnail or full image
    const filenameToUse = isThumbnail && !filename.includes('_thumb') 
      ? filename.replace(/\.(jpg|jpeg|png|gif|webp)$/, '_thumb.$1')
      : filename;
      
    // First try to fetch from CDN directly (public access)
    const imageUrl = `https://cdn.summitpoint.co.tz/images/${filenameToUse}`;
    
    try {
      const response = await fetch(imageUrl);
      
      if (response.ok) {
        const imageData = await response.arrayBuffer();
        const contentType = response.headers.get('content-type') || 'image/jpeg';
        
        return new NextResponse(imageData, {
          headers: {
            'Content-Type': contentType,
            'Cache-Control': 'public, max-age=86400' // Cache for 24 hours
          }
        });
      }
    } catch (error) {
      console.error('Error fetching from CDN:', error);
    }
    
    // Fallback to API with auth token if CDN fetch fails
    const apiEndpoint = isThumbnail ? 'thumbnail' : 'image';
    const apiUrl = `https://summitpoint.co.tz/api/v2/events/${apiEndpoint}/${filename}`;
    const apiResponse = await fetch(apiUrl, {
      headers: getAuthHeaders()
    });
    
    if (!apiResponse.ok) {
      // Try alternate endpoints
      const endpoints = isThumbnail 
        ? ['thumb', 'thumbnail', 'banner/thumb']
        : ['image', 'banner', 'banner/image'];
        
      for (const endpoint of endpoints) {
        const altApiUrl = `https://summitpoint.co.tz/api/v2/events/${endpoint}/${filename}`;
        try {
          const altResponse = await fetch(altApiUrl, {
            headers: getAuthHeaders()
          });
          
          if (altResponse.ok) {
            const imageData = await altResponse.arrayBuffer();
            const contentType = altResponse.headers.get('content-type') || 'image/jpeg';
            
            return new NextResponse(imageData, {
              headers: {
                'Content-Type': contentType,
                'Cache-Control': 'public, max-age=86400' // Cache for 24 hours
              }
            });
          }
        } catch (endpointError) {
          console.error(`Error trying endpoint ${endpoint}:`, endpointError);
        }
      }
      
      return NextResponse.json(
        { error: 'Failed to fetch image from any endpoint' },
        { status: 404 }
      );
    }
    
    const imageData = await apiResponse.arrayBuffer();
    const contentType = apiResponse.headers.get('content-type') || 'image/jpeg';
    
    return new NextResponse(imageData, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=86400' // Cache for 24 hours
      }
    });
  } catch (error) {
    console.error('Error processing image request:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 