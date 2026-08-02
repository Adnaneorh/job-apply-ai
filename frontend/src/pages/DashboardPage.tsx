import { QuickActions } from '../components/Dashboard/QuickActions';
import { Stats } from '../components/Dashboard/Stats';

export function DashboardPage() {
  return (
    <div>
      <Stats cards={[
        { label: 'Total Applications', value: '34', trend: '+5 this week' },
        { label: 'Interviews', value: '6', trend: '+2 this week' },
        { label: 'Success Rate', value: '18%', trend: '+3%' }
      ]} />
      <QuickActions />
    </div>
  );
}
