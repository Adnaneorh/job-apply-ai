export type ThemeName = 'blue' | 'purple' | 'green' | 'red';

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  remote: boolean;
  salaryMin: number;
  salaryMax: number;
  description: string;
  matchScore?: number;
}

export type ApplicationStatus = 'applied' | 'reviewing' | 'interview' | 'offer' | 'rejected';

export interface Application {
  id: string;
  jobId: string;
  notes?: string;
  status: ApplicationStatus;
  createdAt: string;
  job?: Job;
}

export interface Profile {
  id: string;
  fullName: string;
  title: string;
  skills: string[];
  summary: string;
  experienceYears: number;
  preferredLocation: string;
}

export interface StatCard {
  label: string;
  value: string;
  trend?: string;
}
