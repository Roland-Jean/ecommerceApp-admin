// API Configuration for Spring Boot Backend
export const API_CONFIG = {
  // Update this to match your Spring Boot backend URL
  baseURL: import.meta.env.VITE_API_URL || 
           (import.meta.env.PROD
             ? 'https://your-spring-boot-backend.com/api'  // Replace with your actual backend URL
             : 'http://localhost:8080/api'),
  
  // Request timeout (in milliseconds)
  timeout: 30000,
  
  // API Endpoints
  endpoints: {
    auth: {
      login: "/auth/login",
      logout: "/auth/logout",
      refresh: "/auth/refresh",
      me: "/auth/me",
    },
    // Add your other endpoints here
    posts: "/posts",
    categories: "/categories",
  },
};

// Helper function to get full API URL
export const getApiUrl = (endpoint: string) => {
  return `${API_CONFIG.baseURL}${endpoint}`;
};
