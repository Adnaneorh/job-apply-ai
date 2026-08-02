import type { ApplicationStatus } from '../../types';

const classes: Record<ApplicationStatus, string> = {
  applied: 'bg-blue-100 text-blue-700',
  reviewing: 'bg-amber-100 text-amber-700',
  interview: 'bg-purple-100 text-purple-700',
  offer: 'bg-green-100 text-green-700',
  rejected: 'bg-red-100 text-red-700'
};

export function StatusBadge({ status }: { status: ApplicationStatus }) {
  return <span className={`rounded-full px-2 py-1 text-xs font-medium ${classes[status]}`}>{status}</span>;
}
