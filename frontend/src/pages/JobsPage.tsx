import { useMemo, useState } from 'react';
import { useFetch } from '../hooks/useFetch';
import { api } from '../services/api';
import type { Job } from '../types';
import { JobFilters, type JobFilterState } from '../components/Jobs/JobFilters';
import { JobsList } from '../components/Jobs/JobsList';

export function JobsPage() {
  const [filters, setFilters] = useState<JobFilterState>({ title: '', location: '', remote: false, salary: 0 });
  const { data } = useFetch(async () => (await api.get<{ jobs: Job[] }>('/jobs')).data.jobs, []);
  const filtered = useMemo(
    () => (data || []).filter((j) =>
      j.title.toLowerCase().includes(filters.title.toLowerCase()) &&
      j.location.toLowerCase().includes(filters.location.toLowerCase()) &&
      (!filters.remote || j.remote) &&
      (!filters.salary || j.salaryMax >= filters.salary)
    ),
    [data, filters]
  );

  return (
    <div>
      <JobFilters filters={filters} onChange={setFilters} />
      <JobsList jobs={filtered} />
    </div>
  );
}
