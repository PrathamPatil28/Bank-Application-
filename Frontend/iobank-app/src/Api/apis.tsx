// src/Api/api.ts
import axios from 'axios';

const apis = axios.create({
  baseURL: 'http://localhost:8080/', // adjust if your backend URL differs
  headers: {
    'Content-Type': 'application/json',
  },
});

apis.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('access_token');
    if (token) {
      config.headers['Authorization'] = token; // already includes "Bearer "
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default apis;
