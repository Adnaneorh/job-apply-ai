import { createContext, useEffect, useMemo, useState } from 'react';
import { authService } from '../services/auth';
import type { User } from '../types';

type AuthContextValue = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }
    authService.me().then(setUser).catch(() => localStorage.removeItem('token')).finally(() => setLoading(false));
  }, []);

  const value = useMemo(
    () => ({
      user,
      loading,
      async login(email: string, password: string) {
        const res = await authService.login(email, password);
        localStorage.setItem('token', res.token);
        setUser(res.user);
      },
      async signup(email: string, password: string, name: string) {
        const res = await authService.signup(email, password, name);
        localStorage.setItem('token', res.token);
        setUser(res.user);
      },
      logout() {
        localStorage.removeItem('token');
        setUser(null);
      }
    }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
