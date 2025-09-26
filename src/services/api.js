import axios from 'axios';

// Create an axios instance with default config
const api = axios.create({
  baseURL: process.env.REACT_APP_backendUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include auth token when available
api.interceptors.request.use(
  (config) => {
    // Check if we need to add seller or user token
    const sellerToken = localStorage.getItem('sellerToken');
    const userToken = localStorage.getItem('userToken');
    
    if (sellerToken) {
      config.headers.Authorization = `Bearer ${sellerToken}`;
    } else if (userToken) {
      config.headers.Authorization = `Bearer ${userToken}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;