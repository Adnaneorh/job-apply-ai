import { Link } from 'react-router-dom';
import { ROUTES } from '../../config/constants';

export function QuickActions() {
  return (
    <div className="mt-6 grid gap-3 md:grid-cols-2">
      <Link to={ROUTES.jobs} className="rounded-lg border bg-white p-4 dark:bg-slate-800">Search Jobs</Link>
      <Link to={ROUTES.profile} className="rounded-lg border bg-white p-4 dark:bg-slate-800">Update Profile</Link>
    </div>
  );
}
