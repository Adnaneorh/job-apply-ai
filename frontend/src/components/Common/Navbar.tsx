import { APP_NAME } from '../../config/constants';
import { useAuth } from '../../hooks/useAuth';

export function Navbar() {
  const { user, logout } = useAuth();
  return (
    <header className="flex items-center justify-between border-b border-slate-200 bg-white/80 px-4 py-3 backdrop-blur dark:border-slate-700 dark:bg-slate-900/80">
      <h1 className="text-lg font-semibold">{APP_NAME}</h1>
      <div className="flex items-center gap-3 text-sm">
        <span>{user?.email}</span>
        <button onClick={logout} className="text-primary">Logout</button>
      </div>
    </header>
  );
}
