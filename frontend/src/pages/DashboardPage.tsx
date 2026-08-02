import { useEffect, useState } from 'react';
import { api } from '../services/api';

export function DashboardPage() {
  const [stats, setStats] = useState({ total: 0, successRate: 0 });

  useEffect(() => {
    api.get('/applications').then(({ data }) => setStats(data.stats)).catch(() => setStats({ total: 0, successRate: 0 }));
  }, []);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Dashboard</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded bg-white p-4 shadow"><p className="text-sm text-slate-500">Applications</p><p className="text-3xl font-semibold">{stats.total}</p></div>
        <div className="rounded bg-white p-4 shadow"><p className="text-sm text-slate-500">Success Rate</p><p className="text-3xl font-semibold">{stats.successRate}%</p></div>
      </div>
    </div>
  );
}
