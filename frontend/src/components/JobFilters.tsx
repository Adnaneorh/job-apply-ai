import { useState } from 'react';

export function JobFilters({ onChange }: { onChange: (filters: { title?: string; location?: string; remote?: boolean; salaryMin?: number }) => void }) {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [remote, setRemote] = useState(false);
  const [salaryMin, setSalaryMin] = useState('');

  return (
    <form
      className="grid gap-3 md:grid-cols-4"
      onSubmit={(e) => {
        e.preventDefault();
        onChange({ title, location, remote, salaryMin: salaryMin ? Number(salaryMin) : undefined });
      }}
    >
      <input className="rounded border border-slate-300 px-3 py-2" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <input className="rounded border border-slate-300 px-3 py-2" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
      <input className="rounded border border-slate-300 px-3 py-2" placeholder="Min salary" type="number" value={salaryMin} onChange={(e) => setSalaryMin(e.target.value)} />
      <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={remote} onChange={(e) => setRemote(e.target.checked)} /> Remote only</label>
      <button className="rounded theme-bg px-4 py-2 text-white md:col-span-4" type="submit">Apply Filters</button>
    </form>
  );
}
