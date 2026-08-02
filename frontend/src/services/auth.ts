import { api } from './api';
import type { User } from '../types';

interface AuthResponse {
  token: string;
  user: User;
}

export const authService = {
  async signup(email: string, password: string, name: string) {
    const { data } = await api.post<AuthResponse>('/auth/signup', { email, password, name });
    return data;
  },
  async login(email: string, password: string) {
    const { data } = await api.post<AuthResponse>('/auth/login', { email, password });
    return data;
  },
  async me() {
    const { data } = await api.get<{ user: User }>('/auth/me');
    return data.user;
  }
};
