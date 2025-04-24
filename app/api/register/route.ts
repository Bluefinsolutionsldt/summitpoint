import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // Get the registration data from the request
    const data = await request.json();

    // Forward the request to the external API
    const response = await fetch(
      "https://summitpoint.co.tz/api/v2/events/registerparticipant",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        // Add a reasonable timeout
        signal: AbortSignal.timeout(10000), // 10 seconds timeout
      }
    );

    // Try to parse the response as JSON
    let result;
    try {
      result = await response.json();
    } catch (e) {
      // If the response is not valid JSON, create a generic error message
      return NextResponse.json(
        { error: "Invalid response from registration server" },
        { status: 500 }
      );
    }

    // If the response is not ok, return the error message
    if (!response.ok) {
      return NextResponse.json(
        { error: result.message || "Failed to register" },
        { status: response.status }
      );
    }

    // Return the successful response
    return NextResponse.json(result);
  } catch (error) {
    console.error('Registration error:', error);
    
    // Handle specific error types
    if (error instanceof TypeError && error.message.includes('fetch')) {
      return NextResponse.json(
        { error: "Could not connect to the registration server. Please check your internet connection and try again." },
        { status: 503 }
      );
    }
    
    // Handle timeout errors
    if (error instanceof DOMException && error.name === 'AbortError') {
      return NextResponse.json(
        { error: "Request timed out. The registration server is taking too long to respond." },
        { status: 504 }
      );
    }
    
    // Generic error fallback
    return NextResponse.json(
      { error: "An error occurred during registration. Please try again later." },
      { status: 500 }
    );
  }
} 