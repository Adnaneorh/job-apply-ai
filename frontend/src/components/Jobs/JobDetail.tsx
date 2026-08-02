import type { Job } from '../../types';

export function JobDetail({ job }: { job: Job }) {
  return (
    <section className="rounded-lg border bg-white p-4 dark:bg-slate-800">
      <h2 className="text-lg font-semibold">{job.title}</h2>
      <p>{job.description}</p>
    </section>
  );
}
