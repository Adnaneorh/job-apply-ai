import { NavLink } from 'react-router-dom';
import { ROUTES } from '../../config/constants';
import { themeOptions } from '../../config/theme';
import { useTheme } from '../../hooks/useTheme';

export function Sidebar() {
  const { theme } = useTheme();
  const currentTheme = themeOptions.find((item) => item.name === theme) ?? themeOptions[0];
  const nav = [
    ['Dashboard', ROUTES.dashboard],
    ['Jobs', ROUTES.jobs],
    ['Applications', ROUTES.applications],
    ['Profile', ROUTES.profile],
    ['Settings', ROUTES.settings]
  ];

  return (
    <aside className={`min-h-screen w-64 bg-gradient-to-b ${currentTheme.classes} p-5 text-white`}>
      <h2 className="mb-6 text-xl font-bold">JobApply AI</h2>
      <nav className="space-y-2">
        {nav.map(([label, to]) => (
          <NavLink key={to} to={to} className={({ isActive }) => `block rounded px-3 py-2 ${isActive ? 'bg-white/25' : 'hover:bg-white/15'}`}>
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
