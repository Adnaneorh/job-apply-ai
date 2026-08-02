import type { Job } from '../../types';

export function JobCard({ job }: { job: Job }) {
  return (
    <article className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800">
      <h3 className="font-semibold">{job.title}</h3>
      <p className="text-sm text-slate-500">{job.company} • {job.location} {job.remote ? '• Remote' : ''}</p>
      <p className="text-sm">${job.salaryMin.toLocaleString()} - ${job.salaryMax.toLocaleString()}</p>
      {typeof job.matchScore === 'number' && <p className="text-sm text-primary">Match: {job.matchScore}%</p>}
    </article>
  );
}
