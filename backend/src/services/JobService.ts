import type { Job } from '../types';

const jobs: Job[] = [
  {
    id: 'job-1',
    title: 'Frontend Engineer',
    company: 'Acme',
    location: 'Remote',
    remote: true,
    salaryMin: 90000,
    salaryMax: 130000,
    description: 'Build React products.'
  },
  {
    id: 'job-2',
    title: 'Backend Engineer',
    company: 'Globex',
    location: 'New York',
    remote: false,
    salaryMin: 100000,
    salaryMax: 150000,
    description: 'Build scalable APIs.'
  }
];

export class JobService {
  list(filters: Partial<{ title: string; location: string; remote: boolean; salary: number }>) {
    return jobs.filter((job) => {
      const titleOk = !filters.title || job.title.toLowerCase().includes(filters.title.toLowerCase());
      const locationOk = !filters.location || job.location.toLowerCase().includes(filters.location.toLowerCase());
      const remoteOk = !filters.remote || job.remote;
      const salaryOk = !filters.salary || job.salaryMax >= filters.salary;
      return titleOk && locationOk && remoteOk && salaryOk;
    });
  }

  getById(id: string) {
    return jobs.find((job) => job.id === id) || null;
  }

  matched() {
    return jobs.map((job, idx) => ({ ...job, matchScore: 75 + idx * 10 }));
  }
}
