import { useState } from 'react';
import { Button } from '../Common/Button';

export function PreferencesEditor({ initialLocation, onSave }: { initialLocation: string; onSave: (location: string) => Promise<void> }) {
  const [location, setLocation] = useState(initialLocation);
  return (
    <div className="rounded-lg border bg-white p-4 dark:bg-slate-800">
      <h3 className="mb-2 font-semibold">Job Preferences</h3>
      <input className="w-full rounded border p-2" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Preferred location" />
      <Button className="mt-2" onClick={() => onSave(location)}>Save Preferences</Button>
    </div>
  );
}
