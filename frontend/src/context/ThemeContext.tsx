import { createContext, useEffect, useMemo, useState } from 'react';
import { storage } from '../services/storage';
import type { ThemeName } from '../types';

type ThemeContextValue = {
  theme: ThemeName;
  darkMode: boolean;
  setTheme: (theme: ThemeName) => void;
  toggleDarkMode: () => void;
};

export const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeName>(() => storage.get<ThemeName>('theme', 'blue'));
  const [darkMode, setDarkMode] = useState<boolean>(() => storage.get<boolean>('darkMode', false));

  useEffect(() => {
    storage.set('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    storage.set('darkMode', darkMode);
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const value = useMemo(
    () => ({
      theme,
      darkMode,
      setTheme: (nextTheme: ThemeName) => setThemeState(nextTheme),
      toggleDarkMode: () => setDarkMode((prev) => !prev)
    }),
    [theme, darkMode]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
