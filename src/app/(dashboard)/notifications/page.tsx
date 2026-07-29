"use client";

import { useState } from 'react';
import { useToast } from '@/context/ToastContext';

export default function NotificationsPage() {
  const { showToast } = useToast();
  const [notifications, setNotifications] = useState([
    { id: '1', title: 'CNC Lathe G7 Temperature Warning', message: 'Spindle temp reached 88°C in Sector G-7.', type: 'ALERT', read: false, time: '10 minutes ago' },
    { id: '2', title: 'Low Inventory Alert: SKU-8842', message: 'Tungsten Carbide Blades dropped below threshold (12 units).', type: 'WARNING', read: false, time: '1 hour ago' },
    { id: '3', title: 'Order #ORD-9910 Completed', message: 'Apex Industrial Robotics order fulfilled & dispatched.', type: 'SUCCESS', read: true, time: '3 hours ago' },
    { id: '4', title: 'System Backup Completed', message: 'Supabase database snapshots stored securely.', type: 'INFO', read: true, time: 'Yesterday' },
  ]);

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    showToast("All notifications marked as read", "info");
  };

  const deleteNotif = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    showToast("Notification cleared", "info");
  };

  return (
    <div className="max-w-[1600px] mx-auto space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="font-headline-lg text-headline-lg mb-1">System Notifications & Alerts</h1>
          <p className="text-on-surface-variant font-body-md">Real-time alerts, system messages, and critical notifications</p>
        </div>
        <button
          onClick={markAllRead}
          className="bg-surface-container-high border border-outline-variant text-on-surface px-4 py-2 rounded-xl text-xs font-bold hover:bg-surface-container-highest"
        >
          Mark All as Read
        </button>
      </div>

      <div className="bg-surface-container rounded-xl border border-outline-variant shadow-sm divide-y divide-outline-variant overflow-hidden">
        {notifications.length > 0 ? (
          notifications.map((n) => (
            <div
              key={n.id}
              className={`p-4 flex items-start justify-between gap-4 transition-colors ${
                !n.read ? 'bg-secondary-container/5' : 'hover:bg-surface-container-highest'
              }`}
            >
              <div className="flex items-start gap-3">
                <span
                  className={`material-symbols-outlined p-2 rounded-lg text-lg ${
                    n.type === 'ALERT'
                      ? 'bg-error-container/20 text-error'
                      : n.type === 'WARNING'
                      ? 'bg-tertiary-container/20 text-tertiary'
                      : n.type === 'SUCCESS'
                      ? 'bg-secondary-container/20 text-secondary'
                      : 'bg-surface-container-high text-primary'
                  }`}
                >
                  {n.type === 'ALERT'
                    ? 'error'
                    : n.type === 'WARNING'
                    ? 'warning'
                    : n.type === 'SUCCESS'
                    ? 'check_circle'
                    : 'info'}
                </span>
                <div>
                  <h4 className="font-bold text-sm text-on-surface flex items-center gap-2">
                    {n.title}
                    {!n.read && <span className="w-2 h-2 rounded-full bg-secondary" />}
                  </h4>
                  <p className="text-xs text-on-surface-variant mt-0.5">{n.message}</p>
                  <span className="text-[10px] text-on-surface-variant/70 mt-1 block">{n.time}</span>
                </div>
              </div>

              <button onClick={() => deleteNotif(n.id)} className="text-on-surface-variant hover:text-error text-xs font-bold">
                Clear
              </button>
            </div>
          ))
        ) : (
          <div className="p-12 text-center text-on-surface-variant">No notifications in inbox.</div>
        )}
      </div>
    </div>
  );
}
