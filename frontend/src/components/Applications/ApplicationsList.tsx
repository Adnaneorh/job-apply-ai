import type { Application } from '../../types';
import { StatusBadge } from './StatusBadge';

export function ApplicationsList({ applications }: { applications: Application[] }) {
  return (
    <div className="space-y-3">
      {applications.map((app) => (
        <article key={app.id} className="rounded-lg border bg-white p-4 dark:bg-slate-800">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">{app.job?.title || app.jobId}</h3>
            <StatusBadge status={app.status} />
          </div>
          {app.notes && <p className="text-sm text-slate-500">{app.notes}</p>}
        </article>
      ))}
    </div>
  );
}
