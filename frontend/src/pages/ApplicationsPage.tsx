import { useFetch } from '../hooks/useFetch';
import { api } from '../services/api';
import { ApplicationsList } from '../components/Applications/ApplicationsList';
import type { Application } from '../types';

export function ApplicationsPage() {
  const { data } = useFetch(async () => (await api.get<{ applications: Application[] }>('/applications')).data.applications, []);
  return <ApplicationsList applications={data || []} />;
}
