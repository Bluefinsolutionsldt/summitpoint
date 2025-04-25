import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';

export async function POST(req: NextRequest) {
  try {
    // Verify user is authenticated
    const session = await auth();
    
    if (!session || !session.user) {
      return NextResponse.json({ 
        success: false, 
        message: 'You must be logged in to register for sessions' 
      }, { status: 401 });
    }

    // Parse the request body
    const body = await req.json();
    const { sessions } = body;

    if (!sessions || !Array.isArray(sessions) || sessions.length === 0) {
      return NextResponse.json({ 
        success: false, 
        message: 'Please select at least one session to attend' 
      }, { status: 400 });
    }

    // Here you would typically store the sessions in a database
    // This is a mock implementation that simulates storage
    
    console.log(`User ${session.user.email} registered for sessions:`, sessions);
    
    // Check for conflicts (sessions happening at the same time)
    const sessionsByDay: Record<string, any[]> = {};
    
    sessions.forEach(session => {
      if (!sessionsByDay[session.day]) {
        sessionsByDay[session.day] = [];
      }
      sessionsByDay[session.day].push(session);
    });
    
    // Look for time conflicts
    let conflicts = [];
    
    for (const day in sessionsByDay) {
      const daySessions = sessionsByDay[day];
      
      for (let i = 0; i < daySessions.length; i++) {
        for (let j = i + 1; j < daySessions.length; j++) {
          // This is a simplified check and would need to be more sophisticated 
          // for real time parsing and overlap detection
          if (daySessions[i].time === daySessions[j].time) {
            conflicts.push({
              day,
              time: daySessions[i].time,
              sessions: [daySessions[i].session, daySessions[j].session]
            });
          }
        }
      }
    }
    
    if (conflicts.length > 0) {
      return NextResponse.json({ 
        success: false, 
        message: 'You have selected sessions with time conflicts',
        conflicts 
      }, { status: 409 });
    }

    // In a real application, you would store the registrations in a database
    // For this example, we'll simulate a successful registration
    
    return NextResponse.json({ 
      success: true, 
      message: 'Successfully registered for sessions',
      data: {
        user: {
          email: session.user.email,
          name: session.user.name
        },
        sessions: sessions.map(s => ({
          id: s.id,
          day: s.day,
          date: s.date,
          time: s.time,
          session: s.session,
          location: s.location
        }))
      }
    }, { status: 200 });
    
  } catch (error) {
    console.error('Error registering for sessions:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'An error occurred while processing your request' 
    }, { status: 500 });
  }
} 