import { Link } from 'react-router-dom';
import { ROUTES } from '../config/constants';

export function HomePage() {
  return (
    <div className="mx-auto mt-20 max-w-3xl px-4 text-center">
      <h1 className="text-4xl font-bold">Automate Your Job Applications</h1>
      <p className="mt-4 text-slate-600 dark:text-slate-300">Track jobs, auto-fill forms, generate AI answers and apply faster.</p>
      <div className="mt-8 flex justify-center gap-3">
        <Link to={ROUTES.signup} className="rounded bg-primary px-5 py-2 text-white">Get Started</Link>
        <Link to={ROUTES.login} className="rounded border px-5 py-2">Login</Link>
      </div>
    </div>
  );
}
