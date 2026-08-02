import { createContext, useCallback, useState } from 'react';

export interface NotificationMessage {
  id: string;
  message: string;
}

type NotificationContextValue = {
  notifications: NotificationMessage[];
  push: (message: string) => void;
  dismiss: (id: string) => void;
};

export const NotificationContext = createContext<NotificationContextValue | null>(null);

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<NotificationMessage[]>([]);

  const push = useCallback((message: string) => {
    const id = crypto.randomUUID();
    setNotifications((prev) => [...prev, { id, message }]);
    setTimeout(() => setNotifications((prev) => prev.filter((n) => n.id !== id)), 3000);
  }, []);

  const dismiss = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  return <NotificationContext.Provider value={{ notifications, push, dismiss }}>{children}</NotificationContext.Provider>;
}
