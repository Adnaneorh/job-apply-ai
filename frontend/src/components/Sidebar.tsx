import { Link, useLocation } from 'react-router-dom';

const links = [
  { to: '/', label: 'Dashboard' },
  { to: '/jobs', label: 'Jobs' },
  { to: '/applications', label: 'Applications' },
  { to: '/profile', label: 'Profile' },
  { to: '/settings', label: 'Settings' }
];

export function Sidebar() {
  const location = useLocation();

  return (
    <aside className="w-full md:w-64 border-r border-slate-200 bg-white p-4">
      <h1 className="text-lg font-semibold theme-text">JobApply AI</h1>
      <nav className="mt-4 flex md:block gap-2 overflow-auto">
        {links.map((link) => {
          const active = location.pathname === link.to;
          return (
            <Link
              key={link.to}
              className={`block rounded px-3 py-2 text-sm ${active ? 'bg-slate-900 text-white' : 'text-slate-700 hover:bg-slate-100'}`}
              to={link.to}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
