import type { Application } from '../../types';

export function ApplicationDetail({ application }: { application: Application }) {
  return (
    <div className="rounded-lg border bg-white p-4 dark:bg-slate-800">
      <h2 className="font-semibold">Application {application.id}</h2>
      <p>Status: {application.status}</p>
      <p>{application.notes || 'No notes'}</p>
    </div>
  );
}
