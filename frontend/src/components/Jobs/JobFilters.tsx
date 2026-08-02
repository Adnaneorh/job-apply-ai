export interface JobFilterState {
  title: string;
  location: string;
  remote: boolean;
  salary: number;
}

export function JobFilters({ filters, onChange }: { filters: JobFilterState; onChange: (next: JobFilterState) => void }) {
  return (
    <div className="grid gap-3 rounded-lg border bg-white p-4 dark:bg-slate-800 md:grid-cols-4">
      <input value={filters.title} onChange={(e) => onChange({ ...filters, title: e.target.value })} placeholder="Title" className="rounded border p-2" />
      <input value={filters.location} onChange={(e) => onChange({ ...filters, location: e.target.value })} placeholder="Location" className="rounded border p-2" />
      <label className="flex items-center gap-2"><input type="checkbox" checked={filters.remote} onChange={(e) => onChange({ ...filters, remote: e.target.checked })} /> Remote</label>
      <input type="number" value={filters.salary} onChange={(e) => onChange({ ...filters, salary: Number(e.target.value) })} placeholder="Min salary" className="rounded border p-2" />
    </div>
  );
}
