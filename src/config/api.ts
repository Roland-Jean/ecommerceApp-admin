// API Configuration for Spring Boot Backend
export const API_CONFIG = {
  // Update this to match your Spring Boot backend URL
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080/api",
  
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
  
  // Request timeout (in milliseconds)
  timeout: 30000,
};

// Helper function to get full API URL
export const getApiUrl = (endpoint: string) => {
  return `${API_CONFIG.baseURL}${endpoint}`;
};
