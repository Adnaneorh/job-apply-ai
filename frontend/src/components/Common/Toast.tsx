import { useContext } from 'react';
import { NotificationContext } from '../../context/NotificationContext';

export function ToastContainer() {
  const context = useContext(NotificationContext);
  if (!context) return null;
  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2">
      {context.notifications.map((n) => (
        <button key={n.id} className="block rounded bg-slate-900 px-3 py-2 text-white" onClick={() => context.dismiss(n.id)}>
          {n.message}
        </button>
      ))}
    </div>
  );
}
