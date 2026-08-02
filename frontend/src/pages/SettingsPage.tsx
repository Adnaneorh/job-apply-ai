import { useTheme } from '../context/theme';
import type { ThemeName } from '../types';

const themes: ThemeName[] = ['blue', 'purple', 'green', 'red'];

export function SettingsPage() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Settings</h2>
      <div className="rounded bg-white p-4 shadow">
        <p className="mb-3 text-sm text-slate-600">Select dashboard theme</p>
        <div className="flex flex-wrap gap-3">
          {themes.map((item) => (
            <button
              className={`rounded border px-4 py-2 capitalize ${theme === item ? 'border-slate-900' : 'border-slate-300'}`}
              key={item}
              onClick={() => setTheme(item)}
              type="button"
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
