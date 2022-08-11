import axios, { AxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
  baseURL: 'http://localhost:5000',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

api.interceptors.request.use((config: AxiosRequestConfig) => {
  const token = Cookies.get('token');

  if (token) {
    config.headers!.Authorization = token;
  }

  return config;
});

export default api;
