import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('access_token');
    if (token) {
      // Add Bearer prefix if not present
      if (!token.startsWith('Bearer ')) {
        config.headers['Authorization'] = `Bearer ${token}`;
      } else {
        config.headers['Authorization'] = token;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const api = (instance: any) => ({
  get: (url: any, headers = {}) => instance.get(url, { headers }),
  post: (url: any, body: any, headers = {}) => instance.post(url, body, { headers }),
  put: (url: any, body: any, headers = {}) => instance.put(url, body, { headers }),
  delete: (url: any, headers = {}) => instance.delete(url, { headers }),
});

export default api(axiosInstance);
