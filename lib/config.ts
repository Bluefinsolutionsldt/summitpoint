// API configuration settings
const config = {
  // API endpoint
  API_BASE_URL: 'https://summitpoint.co.tz',
  
  // Feature flags
  features: {
    // When true, use sample data instead of making API calls
    useSampleData: true,
    
    // When true, use mock data for timetable and other sections
    useMockData: true,
    
    // Development mode detection
    isDevelopment: process.env.NODE_ENV === 'development',
  },
  
  // Auth settings
  auth: {
    // Static auth token for development
    staticToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoibXVzc2FraXNlbmFAZ21haWwuY29tIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiUGFydGljaXBhbnQiLCJzdWIiOiJiZjc1Y2I2My0yNGFmLTRjMzktOGQwYS0yOGJlYWNiNDYxNDkiLCJuYmYiOiIxNzQ1NDExNzg0IiwiZXhwIjoiMTc3Njk0Nzc4NCJ9.4zB6qfDupHwEn3aSMrrMdRxOGdnoWl4zlL1KZEilr30',
  },
  
  // Helper function to determine if we should use sample/mock data
  shouldUseSampleData: function() {
    // Always use sample data if the feature flag is true
    if (this.features.useSampleData) {
      return true;
    }
    
    // Use sample data in development mode
    if (this.features.isDevelopment) {
      return true;
    }
    
    // Default to false in production
    return false;
  }
};

export default config; 