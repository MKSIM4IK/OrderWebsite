import axios from 'axios';

// Use relative URL so requests go through nginx proxy in Docker
// In Docker: /api/ proxies to http://backend:5000/api/
// In dev: /api/ proxies to localhost (or configure proxy in package.json)
const API_BASE = '/';

// Create axios instance
const axiosInstance = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to every request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle 401 responses
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid - clear storage
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      // Optionally redirect to login
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
