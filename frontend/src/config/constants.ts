export const APP_NAME = import.meta.env.VITE_APP_NAME || 'JobApply AI';
export const ROUTES = {
  home: '/',
  dashboard: '/dashboard',
  jobs: '/jobs',
  applications: '/applications',
  profile: '/profile',
  settings: '/settings',
  login: '/login',
  signup: '/signup'
} as const;
