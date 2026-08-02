import axios from 'axios';
import { API_URL } from '../config/config';

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: false
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = 'Bearer ' + token;
  }
  return config;
});
