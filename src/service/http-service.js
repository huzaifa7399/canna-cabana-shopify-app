import axios from 'axios';
import { BACKEND_BASE_URL } from '../constants/index';

export const httpService = axios.create({
  baseURL: BACKEND_BASE_URL,
});

httpService.interceptors.request.use(
  (config) => {
    let token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (err) => {
    throw err;
  }
);
