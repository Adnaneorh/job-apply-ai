import { Navigate, Outlet } from 'react-router-dom';
import { ROUTES } from '../../config/constants';
import { useAuth } from '../../hooks/useAuth';
import { LoadingSpinner } from '../Common/LoadingSpinner';

export function ProtectedRoute() {
  const { user, loading } = useAuth();
  if (loading) return <div className="p-10"><LoadingSpinner /></div>;
  if (!user) return <Navigate to={ROUTES.login} replace />;
  return <Outlet />;
}
