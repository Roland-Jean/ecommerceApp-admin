import axios from "axios";

// API Configuration
export const API_CONFIG = {
  baseURL: import.meta.env.VITE_API_URL || "https://www.myapi.douxtelecom.com/api/v1",
};

// Create axios instance
export const api = axios.create({
  baseURL: API_CONFIG.baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to attach token to all requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 unauthorized - token expired or invalid
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
