import clsx from 'clsx';

const colors: Record<string, string> = {
  SAVED: 'bg-slate-100 text-slate-700',
  APPLIED: 'bg-blue-100 text-blue-700',
  INTERVIEW: 'bg-amber-100 text-amber-700',
  OFFER: 'bg-green-100 text-green-700',
  REJECTED: 'bg-red-100 text-red-700'
};

export function StatusBadge({ status }: { status: string }) {
  return <span className={clsx('rounded-full px-2 py-1 text-xs font-medium', colors[status] ?? colors.SAVED)}>{status}</span>;
}
