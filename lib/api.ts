import axios from 'axios';

// Environment check
const isDevelopment = process.env.NODE_ENV === 'development';

// Base API configuration
const baseURL = 'https://summitpoint.co.tz/api';
const apiClient = axios.create({ baseURL });

// Set the token for authenticated requests
export const setAuthToken = (token: string) => {
  if (token) {
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    // Store token in localStorage for persistence
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', token);
    }
  } else {
    delete apiClient.defaults.headers.common['Authorization'];
    // Remove token from localStorage on logout
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
    }
  }
};

// Initialize token from localStorage if available
if (typeof window !== 'undefined') {
  const token = localStorage.getItem('auth_token');
  if (token) {
    setAuthToken(token);
  }
}

// Mock token for development
const MOCK_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoibXVzc2FraXNlbmFAZ21haWwuY29tIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiUGFydGljaXBhbnQiLCJzdWIiOiJiZjc1Y2I2My0yNGFmLTRjMzktOGQwYS0yOGJlYWNiNDYxNDkiLCJuYmYiOiIxNzQ1NDExNzg0IiwiZXhwIjoiMTc3Njk0Nzc4NCJ9.4zB6qfDupHwEn3aSMrrMdRxOGdnoWl4zlL1KZEilr30";

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
      date: "2024-09-09"
    },
    {
      id: "102",
      title: "Keynote: The Future of Procurement in East Africa",
      description: "Overview of procurement challenges and opportunities in the region",
      startTime: "11:00",
      endTime: "12:30",
      speaker: "Dr. James Ndongo",
      date: "2024-09-09"
    },
    {
      id: "103",
      title: "Panel Discussion: Digital Transformation in Procurement",
      description: "Exploring e-procurement systems and digital tools",
      startTime: "14:00",
      endTime: "15:30",
      date: "2024-09-10"
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
  // Get timetable for an event
  getTimetable: async (eventId: string | number) => {
    try {
      // In development mode or if encountering an error, use mock data
      if (isDevelopment) {
        console.log('Using mock timetable data in development mode');
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 800));
        return mockData.timetable;
      }
      
      const response = await apiClient.get(`/v1/scheduleitems/${eventId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching timetable:', error);
      
      // If in development, provide fallback data to continue testing
      if (isDevelopment) {
        console.log('Falling back to mock timetable data due to API error');
        return mockData.timetable;
      }
      
      throw error;
    }
  },

  // Get photos for an event
  getPhotos: async (eventId: string | number) => {
    try {
      // In development mode or if encountering an error, use mock data
      if (isDevelopment) {
        console.log('Using mock photos data in development mode');
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 800));
        return mockData.photos;
      }
      
      const response = await apiClient.get(`/v2/events/photos/${eventId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching photos:', error);
      
      // If in development, provide fallback data to continue testing
      if (isDevelopment) {
        console.log('Falling back to mock photos data due to API error');
        return mockData.photos;
      }
      
      throw error;
    }
  },

  // Get sessions for an event
  getSessions: async (eventId: string | number) => {
    try {
      // In development mode or if encountering an error, use mock data
      if (isDevelopment) {
        console.log('Using mock sessions data in development mode');
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 800));
        return mockData.sessions;
      }
      
      const response = await apiClient.get(`/v2/events/sessions/${eventId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching sessions:', error);
      
      // If in development, provide fallback data to continue testing
      if (isDevelopment) {
        console.log('Falling back to mock sessions data due to API error');
        return mockData.sessions;
      }
      
      throw error;
    }
  },

  // Get surveys for an event
  getSurveys: async (eventId: string | number) => {
    try {
      // In development mode or if encountering an error, use mock data
      if (isDevelopment) {
        console.log('Using mock surveys data in development mode');
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 800));
        return mockData.surveys;
      }
      
      const response = await apiClient.get(`/v1/surveys/${eventId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching surveys:', error);
      
      // If in development, provide fallback data to continue testing
      if (isDevelopment) {
        console.log('Falling back to mock surveys data due to API error');
        return mockData.surveys;
      }
      
      throw error;
    }
  },

  // Get speakers for an event
  getSpeakers: async (eventId: string | number) => {
    try {
      // In development mode or if encountering an error, use mock data
      if (isDevelopment) {
        console.log('Using mock speakers data in development mode');
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 800));
        return mockData.speakers;
      }
      
      const response = await apiClient.get(`/v1/participants/speakers/${eventId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching speakers:', error);
      
      // If in development, provide fallback data to continue testing
      if (isDevelopment) {
        console.log('Falling back to mock speakers data due to API error');
        return mockData.speakers;
      }
      
      throw error;
    }
  },
};

export default apiClient; 