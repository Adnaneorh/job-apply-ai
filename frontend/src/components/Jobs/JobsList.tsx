import { JobCard } from './JobCard';
import type { Job } from '../../types';

export function JobsList({ jobs }: { jobs: Job[] }) {
  return (
    <div className="mt-4 grid gap-3">
      {jobs.map((job) => <JobCard key={job.id} job={job} />)}
    </div>
  );
}
