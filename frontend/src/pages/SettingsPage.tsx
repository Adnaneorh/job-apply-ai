import { themeOptions } from '../config/theme';
import { useTheme } from '../hooks/useTheme';

export function SettingsPage() {
  const { theme, setTheme, darkMode, toggleDarkMode } = useTheme();
  return (
    <div className="max-w-xl space-y-5 rounded-xl border bg-white p-5 dark:bg-slate-800">
      <section>
        <h2 className="text-lg font-semibold">Theme</h2>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {themeOptions.map((option) => (
            <button
              key={option.name}
              className={`rounded border px-3 py-2 text-left ${theme === option.name ? 'border-primary' : ''}`}
              onClick={() => setTheme(option.name)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </section>
      <section>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={darkMode} onChange={toggleDarkMode} />
          Dark mode
        </label>
      </section>
    </div>
  );
}
