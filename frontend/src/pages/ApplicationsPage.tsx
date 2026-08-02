import { useEffect, useState } from 'react';
import { StatusBadge } from '../components/StatusBadge';
import { api } from '../services/api';
import type { Application } from '../types';

export function ApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);

  useEffect(() => {
    api.get('/applications').then(({ data }) => setApplications(data.applications));
  }, []);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Application Tracking</h2>
      <div className="grid gap-3">
        {applications.map((app) => (
          <div className="rounded bg-white p-4 shadow" key={app.id}>
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="font-semibold">{app.job.title}</h3>
                <p className="text-sm text-slate-600">{app.job.company}</p>
              </div>
              <StatusBadge status={app.status} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
