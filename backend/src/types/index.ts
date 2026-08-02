export interface User {
  id: string;
  email: string;
  passwordHash: string;
  name: string;
}

export interface Profile {
  id: string;
  userId: string;
  fullName: string;
  title: string;
  summary: string;
  skills: string[];
  experienceYears: number;
  preferredLocation: string;
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
}

export type ApplicationStatus = 'applied' | 'reviewing' | 'interview' | 'offer' | 'rejected';

export interface Application {
  id: string;
  userId: string;
  jobId: string;
  status: ApplicationStatus;
  notes?: string;
  createdAt: string;
}

export interface WorkExperience {
  id: string;
  profileId: string;
  role: string;
  company: string;
}
