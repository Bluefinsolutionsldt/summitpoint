import axios from 'axios';
import { getAuthHeaders } from './api-util';

// Configuration
const baseURL = 'https://api.summitpoint.ictjobs.co.tz/api';
const isDevelopment = process.env.NODE_ENV === 'development';

// Type definitions
interface TimetableItem {
  id: string;
  title: string;
  description?: string;
  startTime: string;
  endTime: string;
  speaker?: string;
  date: string;
  day?: string;
  venue?: string;
  location?: string;
  language?: string;
}

interface SessionItem {
  id: string | number;
  title?: string;
  name?: string;
  description?: string;
  details?: string;
  date?: string;
  startDate?: string;
  endDate?: string;
  startTime?: string;
  endTime?: string;
  venue?: string;
  speaker?: string;
  tags?: string[];
  category?: string;
}

interface SpeakerItem {
  id: string | number;
  name: string;
  designation?: string;
  role?: string;
  organization?: string;
  biography?: string;
  bio?: string;
  image?: string;
  thumbnail?: string;
}

interface PhotoItem {
  id: string | number;
  imageUrl?: string;
  url?: string;
  image?: string;
  caption?: string;
  description?: string;
  thumbnail?: string;
}

// Mock token for development
const MOCK_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoibXVzc2FraXNlbmFAZ21haWwuY29tIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiUGFydGljaXBhbnQiLCJzdWIiOiJiZjc1Y2I2My0yNGFmLTRjMzktOGQwYS0yOGJlYWNiNDYxNDkiLCJuYmYiOiIxNzQ1NDExNzg0IiwiZXhwIjoiMTc3Njk0Nzc4NCJ9.4zB6qfDupHwEn3aSMrrMdRxOGdnoWl4zlL1KZEilr30";

const shouldUseMockData = () => {
  // Use mock data explicitly in development when configured
  if (isDevelopment && process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true') {
    return true;
  }
  
  return isDevelopment;
};

// Base API configuration
const apiClient = axios.create({ baseURL });

// Set the token for authenticated requests
export const setAuthToken = (token: string) => {
  if (token) {
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    // Store token in localStorage for persistence
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', token);
    }
    console.log('Auth token set in headers');
  } else {
    delete apiClient.defaults.headers.common['Authorization'];
    // Remove token from localStorage on logout
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
    }
    console.log('Auth token removed from headers');
  }
};

// Initialize token from localStorage if available
if (typeof window !== 'undefined') {
  const token = localStorage.getItem('auth_token');
  
  if (token) {
    setAuthToken(token);
  } else {
    console.log('No token found in localStorage. Some api calls may fail.');
    // If no token is found in localStorage, use the mock token for now
    if (isDevelopment) {
      setAuthToken(MOCK_TOKEN);
      console.log('Using mock token for development');
    }
  }
}

// Mock data for development
const mockData = {
  timetable: [
    {
      id: "101",
      title: "Opening Ceremony",
      description: "Welcome address and official opening of the forum",
      startTime: "09:00",
      endTime: "10:30",
      speaker: "H.E. Dr. Samia Suluhu Hassan",
      date: "2024-09-09",
      day: "Monday",
      venue: "Main Hall"
    },
    {
      id: "102",
      title: "Keynote: The Future of Procurement in East Africa",
      description: "Overview of procurement challenges and opportunities in the region",
      startTime: "11:00",
      endTime: "12:30",
      speaker: "Dr. James Ndongo",
      date: "2024-09-09",
      day: "Monday",
      venue: "Main Hall"
    },
    {
      id: "103",
      title: "Panel Discussion: Digital Transformation in Procurement",
      description: "Exploring e-procurement systems and digital tools",
      startTime: "14:00",
      endTime: "15:30",
      date: "2024-09-10",
      day: "Tuesday",
      venue: "Conference Room A"
    }
  ],
  speakers: [
    {
      id: "201",
      name: "Dr. Samia Suluhu Hassan",
      title: "President",
      organization: "United Republic of Tanzania",
      bio: "H.E. Dr. Samia Suluhu Hassan is the President of Tanzania and will be the Guest of Honor at the event."
    },
    {
      id: "202",
      name: "Dr. James Ndongo",
      title: "Director General",
      organization: "East African Procurement Authority",
      bio: "Dr. Ndongo is an expert in public procurement with over 20 years of experience in the field."
    },
    {
      id: "203",
      name: "Sarah Kimani",
      title: "Chief Procurement Officer",
      organization: "Ministry of Finance, Kenya",
      bio: "Sarah has pioneered several procurement reforms in Kenya over the past decade."
    }
  ],
  sessions: [
    {
      id: "301",
      title: "E-Procurement Implementation",
      description: "Best practices for implementing e-procurement systems",
      date: "2024-09-10",
      startTime: "09:00",
      endTime: "10:30",
      tags: ["Digital", "Technology", "Implementation"]
    },
    {
      id: "302",
      title: "Sustainable Procurement",
      description: "Incorporating sustainability into public procurement processes",
      date: "2024-09-11",
      startTime: "11:00",
      endTime: "12:30",
      tags: ["Sustainability", "Environment", "Policy"]
    }
  ],
  photos: [
    {
      id: "401",
      url: "https://via.placeholder.com/600x400.png",
      caption: "Opening ceremony"
    },
    {
      id: "402",
      url: "https://via.placeholder.com/600x400.png",
      caption: "Panel discussion"
    },
    {
      id: "403",
      url: "https://via.placeholder.com/600x400.png",
      caption: "Networking event"
    }
  ],
  surveys: [
    {
      id: 122,
      name: "EVENT SURVEY",
      eventId: 176,
      questions: [
        {
          id: 882,
          question: "Do you believe Uganda can achieve Energy sufficiency?",
          questionType: 3,
          answers: [
            "Yes",
            "No"
          ],
          surveyId: 122,
          responses: null
        },
        {
          id: 883,
          question: "What is the primary challenge of the Electric grid of Uganda?",
          questionType: 3,
          answers: [
            "Insufficient generation",
            "Seasonal fluctuations in capacity",
            "Rising demand",
            "Poor distribution infrastructure"
          ],
          surveyId: 122,
          responses: null
        },
        {
          id: 884,
          question: "Where do you wish the next Energy Summit should take place?",
          questionType: 3,
          answers: [
            "Entebbe",
            "Kampala",
            "Hoima",
            "Mbarara"
          ],
          surveyId: 122,
          responses: null
        }
      ]
    }
  ]
};

// FRS Programme data from the PDF document
const frsDocumentData = [
  {
    id: "1",
    day: "Tuesday",
    date: "March 26th, 2024",
    startTime: "08:00",
    endTime: "09:00",
    title: "Registration of Participants",
    speaker: "",
    venue: "Main Entrance",
    description: "Registration and welcome package distribution"
  },
  {
    id: "2",
    day: "Tuesday",
    date: "March 26th, 2024",
    startTime: "09:00",
    endTime: "09:30",
    title: "Opening Ceremony",
    speaker: "Chief Guest",
    venue: "Main Hall",
    description: "Welcome address and official opening"
  },
  {
    id: "3",
    day: "Tuesday",
    date: "March 26th, 2024",
    startTime: "09:30",
    endTime: "10:30",
    title: "Keynote Address: Financing Regions for Sustainable Development",
    speaker: "Dr. Samuel Waweru",
    venue: "Main Hall",
    description: "Overview of regional financing strategies and initiatives"
  },
  {
    id: "4",
    day: "Tuesday",
    date: "March 26th, 2024",
    startTime: "10:30",
    endTime: "11:00",
    title: "Coffee Break",
    speaker: "",
    venue: "Exhibition Area",
    description: "Networking and refreshments"
  },
  {
    id: "5",
    day: "Tuesday",
    date: "March 26th, 2024",
    startTime: "11:00",
    endTime: "12:30",
    title: "Panel Discussion: Regional Financing Models",
    speaker: "Various Experts",
    venue: "Main Hall",
    description: "Discussion on effective financing models for regional development"
  },
  {
    id: "6",
    day: "Tuesday",
    date: "March 26th, 2024",
    startTime: "12:30",
    endTime: "14:00",
    title: "Lunch Break",
    speaker: "",
    venue: "Dining Area",
    description: "Lunch and networking"
  },
  {
    id: "7",
    day: "Wednesday",
    date: "March 27th, 2024",
    startTime: "09:00",
    endTime: "10:30",
    title: "Workshop: Financing Infrastructure Projects",
    speaker: "Ms. Jane Njoroge",
    venue: "Workshop Room A",
    description: "Interactive workshop on infrastructure project financing"
  },
  {
    id: "8",
    day: "Wednesday",
    date: "March 27th, 2024",
    startTime: "10:30",
    endTime: "11:00",
    title: "Coffee Break",
    speaker: "",
    venue: "Exhibition Area",
    description: "Networking and refreshments"
  },
  {
    id: "9",
    day: "Wednesday",
    date: "March 27th, 2024",
    startTime: "11:00",
    endTime: "12:30",
    title: "Case Studies: Successful Regional Financing Initiatives",
    speaker: "Various Presenters",
    venue: "Main Hall",
    description: "Presentation of successful regional financing case studies"
  },
  {
    id: "10",
    day: "Wednesday",
    date: "March 27th, 2024",
    startTime: "12:30",
    endTime: "14:00",
    title: "Networking Lunch",
    speaker: "",
    venue: "Dining Area",
    description: "Lunch and facilitated networking"
  },
  {
    id: "11",
    day: "Wednesday",
    date: "March 27th, 2024",
    startTime: "14:00",
    endTime: "15:30",
    title: "Closing Ceremony and Way Forward",
    speaker: "Event Organizers",
    venue: "Main Hall",
    description: "Conclusions, next steps and closing remarks"
  }
];

// Helper function to convert timetable data format
const convertTimetableFormat = (items: any[]) => {
  return items.map((item: any) => ({
    id: item.id,
    title: item.title,
    description: item.description,
    startTime: item.startTime,
    endTime: item.endTime,
    speaker: item.speaker,
    date: item.date,
    day: item.day,
    venue: item.venue || item.location
  }));
};

// Authentication API
export const authAPI = {
  createToken: async (name: string, email: string) => {
    try {
      // In development mode, use mock data
      if (isDevelopment) {
        console.log('Using mock authentication in development mode');
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 800));
        return MOCK_TOKEN;
      }
      
      // Make the actual API call
      try {
        const response = await axios.post(`${baseURL}/v2/token/create`, { name, email });
        
        // Check if we have valid data
        if (response && response.data) {
          // Handle different response formats
          if (typeof response.data === 'string') {
            return response.data;
          } else if (response.data.token) {
            return response.data.token;
          } else if (response.data.access_token) {
            return response.data.access_token;
          } else {
            console.error('Unexpected token format:', response.data);
            // Fall back to mock token in development
            if (isDevelopment) {
              console.log('Falling back to mock token due to unexpected format');
              return MOCK_TOKEN;
            }
            throw new Error('Invalid token format from API');
          }
        } else {
          throw new Error('No data returned from API');
        }
      } catch (apiError) {
        console.error('API call error:', apiError);
        // Fall back to mock token in development
        if (isDevelopment) {
          console.log('Falling back to mock token due to API error');
          return MOCK_TOKEN;
        }
        throw apiError;
      }
    } catch (error) {
      console.error('Error in createToken:', error);
      
      // If in development, provide fallback token to continue testing
      if (isDevelopment) {
        console.log('Falling back to mock token due to error');
        return MOCK_TOKEN;
      }
      
      throw error;
    }
  },
};

// Event Detail APIs
export const eventAPI = {
  // Helper function to get authentication token
  getAuthToken: function() {
    // In Next.js, localStorage is not available during server-side rendering
    let authToken = '';
    
    // Only access localStorage in browser environment
    if (typeof window !== 'undefined') {
      authToken = localStorage.getItem('auth_token') || '';
    }
    
    // If no token from localStorage, use the provided example token
    if (!authToken) {
      authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoibXVzc2FraXNlbmFAZ21haWwuY29tIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiUGFydGljaXBhbnQiLCJzdWIiOiJiZjc1Y2I2My0yNGFmLTRjMzktOGQwYS0yOGJlYWNiNDYxNDkiLCJuYmYiOiIxNzQ1NDExNzg0IiwiZXhwIjoiMTc3Njk0Nzc4NCJ9.4zB6qfDupHwEn3aSMrrMdRxOGdnoWl4zlL1KZEilr30';
    }
    
    return authToken;
  },
  
  // Helper function for making authenticated API requests
  makeAuthenticatedRequest: async function(url: string) {
    const authToken = this.getAuthToken();
    
    const headers = {
      'Authorization': `Bearer ${authToken}`,
      'Content-Type': 'application/json'
    };
    
    try {
      const response = await fetch(url, { 
        method: 'GET',
        headers
      });
      
      if (!response.ok) {
        const errorText = await response.text().catch(() => 'No error details available');
        
        console.error(`API error (${response.status}): ${errorText}`);
        
        throw new Error(`API returned ${response.status}: ${response.statusText}. Details: ${errorText.substring(0, 100)}${errorText.length > 100 ? '...' : ''}`);
      }
      
      return response.json();
    } catch (error) {
      // If it's already an Error object with our formatting, just rethrow it
      if (error instanceof Error && error.message.includes('API returned')) {
        throw error;
      }
      
      // For network errors or other issues
      console.error('Network error in API request:', error);
      throw new Error(`Network error when calling ${url}: ${error instanceof Error ? error.message : String(error)}`);
    }
  },

  // Get timetable for an event
  getTimetable: async function(eventId: string | number) {
    try {
      if (!eventId) {
        console.error('No event ID provided to getTimetable');
        return [];
      }

      console.log(`Fetching timetable for event ID: ${eventId}`);

      // For FRS_Programme, use the document data
      if (eventId === "frs" || eventId === "176") {
        console.log('Using FRS Programme document data');
        return frsDocumentData;
      }
      
      // In development mode, use mock data
      if (isDevelopment) {
        console.log('Using mock timetable data');
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // This creates a deep copy of the mock data
        return JSON.parse(JSON.stringify(mockData.timetable));
      }
      
      // Make the actual API call
      try {
        const response = await axios.get(`${baseURL}/v1/timetable/${eventId}`, {
          headers: getAuthHeaders()
        });
        
        if (response.data && Array.isArray(response.data)) {
          return response.data;
        } else if (response.data && Array.isArray(response.data.result)) {
          return response.data.result;
        } else {
          console.log(`No timetable items found for event ID ${eventId}`);
          return [];
        }
      } catch (apiError) {
        console.error(`Network or API error when fetching timetable for event ID ${eventId}:`, apiError);
        
        // In development, provide fallback data
        if (isDevelopment) {
          console.log('Falling back to mock timetable data due to API error');
          return JSON.parse(JSON.stringify(mockData.timetable));
        }
        throw apiError;
      }
    } catch (error) {
      console.error('Error in getTimetable:', error);
      
      // If in development, provide fallback data
      if (isDevelopment) {
        console.log('Falling back to mock timetable data due to error');
        return JSON.parse(JSON.stringify(mockData.timetable));
      }
      
      throw error;
    }
  },

  // Get photos for an event
  getPhotos: async function(eventId: string | number) {
    try {
      // Validate that we have a valid event ID
      if (!eventId) {
        console.error('No event ID provided to getPhotos');
        return [];
      }
      
      console.log(`Fetching photos for event ID: ${eventId}`);
      
      // Check if we should use mock data
      if (shouldUseMockData()) {
        console.log('Using mock photos data');
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // If we're using mock data but want to simulate empty data for specific events
        if (eventId && eventId.toString() !== '16') {
          console.log(`No mock data available for event ID ${eventId}, returning empty array`);
          return [];
        }
        
        return mockData.photos;
      }
      
      try {
        // Direct API call to get photos
        const apiUrl = `https://summitpoint.co.tz/api/v2/events/photos/${eventId}`;
        const data = await this.makeAuthenticatedRequest(apiUrl);
        
        if (Array.isArray(data)) {
          return data.map((photo: any) => ({
            id: photo.id.toString(),
            url: photo.imageUrl ? 
              photo.imageUrl.startsWith('http') ? 
                photo.imageUrl : 
                `https://summitpoint.co.tz/uploads/events/photos/${photo.imageUrl}` : 
              photo.url ? photo.url : `https://summitpoint.co.tz/uploads/events/photos/${photo.image}`,
            caption: photo.caption || photo.description || `Event photo ${photo.id}`,
            thumbnail: photo.thumbnail ? 
              `https://summitpoint.co.tz/uploads/events/photos/${photo.thumbnail}` : 
              null,
          }));
        }
        
        return Array.isArray(data) ? data : [];
      } catch (apiError) {
        console.error(`Network or API error when fetching photos for event ID ${eventId}:`, apiError);
        
        // Fall back to mock data for development/testing
        if (isDevelopment) {
          console.log('Falling back to mock photos data due to API error');
          // In development, we'll still show mock data for the demo event
          if (eventId && eventId.toString() === '16') {
            return mockData.photos;
          }
        }
        
        return [];
      }
    } catch (error) {
      console.error('Error in getPhotos:', error);
      
      // Provide fallback data only for known events
      if (isDevelopment && eventId && eventId.toString() === '16') {
        console.log('Falling back to mock photos data due to error');
        return mockData.photos;
      }
      
      return [];
    }
  },

  // Get sessions for an event
  getSessions: async function(eventId: string | number) {
    try {
      // Validate that we have a valid event ID
      if (!eventId) {
        console.error('No event ID provided to getSessions');
        return [];
      }
      
      console.log(`Fetching sessions for event ID: ${eventId}`);
      
      // Check if we should use mock data
      if (shouldUseMockData()) {
        console.log('Using mock sessions data');
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // If we're using mock data but want to simulate empty data for specific events
        if (eventId && eventId.toString() !== '16') {
          console.log(`No mock data available for event ID ${eventId}, returning empty array`);
          return [];
        }
        
        return mockData.sessions;
      }
      
      try {
        // Direct API call to get sessions
        const apiUrl = `https://summitpoint.co.tz/api/v2/events/sessions/${eventId}`;
        const data = await this.makeAuthenticatedRequest(apiUrl);
        
        // If no sessions returned from the API, try to convert timetable items to sessions format
        if (!Array.isArray(data) || data.length === 0) {
          console.log(`No sessions found for event ID ${eventId}, falling back to timetable data`);
          
          // Get timetable data and convert it to sessions format
          try {
            const timetableData = await this.getTimetable(eventId);
            
            if (timetableData && timetableData.length > 0) {
              return timetableData.map((item: any) => ({
                id: item.id,
                title: item.title,
                description: item.description || '',
                date: item.date,
                startTime: item.startTime,
                endTime: item.endTime,
                venue: item.venue,
                speaker: item.speaker,
                tags: item.language ? [item.language] : []
              }));
            }
          } catch (fallbackError) {
            console.error('Error using timetable as fallback for sessions:', fallbackError);
          }
        }
        
        if (Array.isArray(data)) {
          return data.map((session: any) => ({
            id: session.id.toString(),
            title: session.title || session.name,
            description: session.description || session.details || '',
            date: session.date ? new Date(session.date).toISOString().split('T')[0] : 
                  session.startDate ? new Date(session.startDate).toISOString().split('T')[0] : '',
            startTime: session.startTime || (session.startDate ? new Date(session.startDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''),
            endTime: session.endTime || (session.endDate ? new Date(session.endDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''),
            tags: session.tags || (session.category ? [session.category] : []),
            venue: session.venue || '',
            speaker: session.speaker || ''
          }));
        }
        
        return [];
      } catch (apiError) {
        console.error(`Network or API error when fetching sessions for event ID ${eventId}:`, apiError);
        
        // Fall back to mock data for development/testing
        if (isDevelopment) {
          console.log('Falling back to mock sessions data due to API error');
          // In development, we'll still show mock data for the demo event
          if (eventId && eventId.toString() === '16') {
            return mockData.sessions;
          }
        }
        
        return [];
      }
    } catch (error) {
      console.error('Error in getSessions:', error);
      
      // Provide fallback data only for known events
      if (isDevelopment && eventId && eventId.toString() === '16') {
        console.log('Falling back to mock sessions data due to error');
        return mockData.sessions;
      }
      
      return [];
    }
  },

  // Get surveys for an event
  getSurveys: async function(eventId: string | number) {
    try {
      // Validate that we have a valid event ID
      if (!eventId) {
        console.error('No event ID provided to getSurveys');
        return [];
      }
      
      console.log(`Fetching surveys for event ID: ${eventId}`);
      
      // Check if we should use mock data
      if (shouldUseMockData()) {
        console.log('Using mock surveys data');
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // If we're using mock data but want to simulate empty data for specific events
        if (eventId && eventId.toString() !== '16') {
          console.log(`No mock data available for event ID ${eventId}, returning empty array`);
          return [];
        }
        
        return mockData.surveys;
      }
      
      try {
        // Direct API call to get surveys
        const apiUrl = `https://summitpoint.co.tz/api/v1/surveys/${eventId}`;
        const data = await this.makeAuthenticatedRequest(apiUrl);
        
        return Array.isArray(data) ? data : [];
      } catch (apiError) {
        console.error(`Network or API error when fetching surveys for event ID ${eventId}:`, apiError);
        
        // Fall back to mock data for development/testing
        if (isDevelopment) {
          console.log('Falling back to mock surveys data due to API error');
          // In development, we'll still show mock data for the demo event
          if (eventId && eventId.toString() === '16') {
            return mockData.surveys;
          }
        }
        
        return [];
      }
    } catch (error) {
      console.error('Error in getSurveys:', error);
      
      // Provide fallback data only for known events
      if (isDevelopment && eventId && eventId.toString() === '16') {
        console.log('Falling back to mock surveys data due to error');
        return mockData.surveys;
      }
      
      return [];
    }
  },

  // Get speakers for an event
  getSpeakers: async function(eventId: string | number) {
    try {
      // Validate that we have a valid event ID
      if (!eventId) {
        console.error('No event ID provided to getSpeakers');
        return [];
      }
      
      console.log(`Fetching speakers for event ID: ${eventId}`);
      
      // Check if we should use mock data
      if (shouldUseMockData()) {
        console.log('Using mock speakers data');
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // If we're using mock data but want to simulate empty data for specific events
        if (eventId && eventId.toString() !== '16') {
          console.log(`No mock data available for event ID ${eventId}, returning empty array`);
          return [];
        }
        
        return mockData.speakers;
      }
      
      try {
        // Direct API call to get speakers
        const apiUrl = `https://summitpoint.co.tz/api/v1/participants/speakers/${eventId}`;
        const data = await this.makeAuthenticatedRequest(apiUrl);
        
        if (Array.isArray(data)) {
          return data.map((speaker: any) => ({
            id: speaker.id.toString(),
            name: speaker.name,
            title: speaker.designation || speaker.role || '',
            organization: speaker.organization || '',
            bio: speaker.biography || '',
            imageUrl: speaker.image ? 
              `https://summitpoint.co.tz/uploads/participants/${speaker.image}` : 
              null,
            thumbnail: speaker.thumbnail ? 
              `https://summitpoint.co.tz/uploads/participants/${speaker.thumbnail}` : 
              null,
          }));
        }
        
        return Array.isArray(data) ? data : [];
      } catch (apiError) {
        console.error(`Network or API error when fetching speakers for event ID ${eventId}:`, apiError);
        
        // Fall back to mock data for development/testing
        if (isDevelopment) {
          console.log('Falling back to mock speakers data due to API error');
          // In development, we'll still show mock data for the demo event
          if (eventId && eventId.toString() === '16') {
            return mockData.speakers;
          }
        }
        
        return [];
      }
    } catch (error) {
      console.error('Error in getSpeakers:', error);
      
      // Provide fallback data only for known events
      if (isDevelopment && eventId && eventId.toString() === '16') {
        console.log('Falling back to mock speakers data due to error');
        return mockData.speakers;
      }
      
      return [];
    }
  },
};

export default apiClient; 