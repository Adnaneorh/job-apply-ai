import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Navbar } from '../Common/Navbar';

export function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-900 dark:text-slate-100">
      <Sidebar />
      <div className="flex min-h-screen flex-1 flex-col">
        <Navbar />
        <main className="p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
