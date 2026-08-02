import { useEffect, useState } from 'react';
import type { Job } from '../types';
import { api } from '../services/api';
import { JobFilters } from '../components/JobFilters';

export function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);

  async function search(filters: Record<string, unknown> = {}) {
    setLoading(true);
    const { data } = await api.post('/jobs/search', filters);
    setJobs(data);
    setLoading(false);
  }

  useEffect(() => {
    search();
  }, []);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Job Listing</h2>
      <JobFilters onChange={search} />
      {loading && <p>Loading...</p>}
      <div className="grid gap-3">
        {jobs.map((job) => (
          <div className="rounded bg-white p-4 shadow" key={job.id}>
            <h3 className="font-semibold">{job.title}</h3>
            <p className="text-sm text-slate-600">{job.company} • {job.location} {job.isRemote && '• Remote'}</p>
            <p className="mt-2 text-sm">{job.description}</p>
            <button className="mt-3 rounded theme-bg px-3 py-2 text-sm text-white" onClick={async () => {
              await api.post('/applications', { jobId: job.id, status: 'APPLIED' });
            }}>Apply with one click</button>
          </div>
        ))}
      </div>
    </div>
  );
}
