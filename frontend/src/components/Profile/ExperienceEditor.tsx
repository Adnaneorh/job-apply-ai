import { useState } from 'react';
import { Button } from '../Common/Button';

export function ExperienceEditor({ onAdd }: { onAdd: (role: string, company: string) => Promise<void> }) {
  const [role, setRole] = useState('');
  const [company, setCompany] = useState('');
  return (
    <div className="rounded-lg border bg-white p-4 dark:bg-slate-800">
      <h3 className="mb-2 font-semibold">Add Experience</h3>
      <input className="mb-2 w-full rounded border p-2" placeholder="Role" value={role} onChange={(e) => setRole(e.target.value)} />
      <input className="mb-2 w-full rounded border p-2" placeholder="Company" value={company} onChange={(e) => setCompany(e.target.value)} />
      <Button onClick={() => onAdd(role, company)} disabled={!role || !company}>Save</Button>
    </div>
  );
}
