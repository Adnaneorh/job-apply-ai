export type ThemeName = 'blue' | 'purple' | 'green' | 'red';

export type User = { id: string; email: string; name: string };

export type Job = {
  id: string;
  title: string;
  company: string;
  location: string;
  isRemote: boolean;
  salaryMin?: number;
  salaryMax?: number;
  source: string;
  description: string;
};

export type Application = {
  id: string;
  status: 'SAVED' | 'APPLIED' | 'INTERVIEW' | 'OFFER' | 'REJECTED';
  notes?: string;
  job: Job;
};
