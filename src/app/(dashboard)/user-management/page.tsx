"use client";

import { useState } from 'react';
import { useToast } from '@/context/ToastContext';

export default function UserManagementPage() {
  const { showToast } = useToast();
  const [users, setUsers] = useState([
    { id: 'u1', name: 'Plant Admin', email: 'admin@nexus-factory.com', role: 'SUPER_ADMIN', status: 'ACTIVE' },
    { id: 'u2', name: 'Sarah Connor', email: 's.connor@apexrobotics.com', role: 'MANAGER', status: 'ACTIVE' },
    { id: 'u3', name: 'Marcus Vance', email: 'm.vance@plant.com', role: 'EMPLOYEE', status: 'ACTIVE' },
    { id: 'u4', name: 'David Miller', email: 'd.miller@plant.com', role: 'EMPLOYEE', status: 'ACTIVE' },
  ]);

  const handleRoleChange = (id: string, newRole: string) => {
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, role: newRole } : u)));
    showToast(`Role permissions updated to ${newRole}`, "info");
  };

  return (
    <div className="max-w-[1600px] mx-auto space-y-6">
      <div>
        <h1 className="font-headline-lg text-headline-lg mb-1">User Account Governance</h1>
        <p className="text-on-surface-variant font-body-md">Manage user accounts, system access levels, and active sessions</p>
      </div>

      <div className="bg-surface-container rounded-xl border border-outline-variant shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-surface-container-high border-b border-outline-variant">
            <tr>
              <th className="px-6 py-3.5 font-label-xs text-on-surface-variant uppercase">User Name</th>
              <th className="px-6 py-3.5 font-label-xs text-on-surface-variant uppercase">Email Address</th>
              <th className="px-6 py-3.5 font-label-xs text-on-surface-variant uppercase">Assigned Role</th>
              <th className="px-6 py-3.5 font-label-xs text-on-surface-variant uppercase">Account Status</th>
              <th className="px-6 py-3.5 font-label-xs text-on-surface-variant uppercase text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant">
            {users.map((u) => (
              <tr key={u.id} className="hover:bg-surface-container-highest transition-colors">
                <td className="px-6 py-4 font-bold text-on-surface">{u.name}</td>
                <td className="px-6 py-4 text-xs text-primary font-medium">{u.email}</td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                    u.role === 'SUPER_ADMIN' ? 'bg-secondary-container/20 text-secondary' :
                    u.role === 'MANAGER' ? 'bg-tertiary-container/20 text-tertiary' :
                    'bg-surface-container-high text-on-surface-variant'
                  }`}>
                    {u.role}
                  </span>
                </td>
                <td className="px-6 py-4 text-xs font-bold text-secondary">{u.status}</td>
                <td className="px-6 py-4 text-right">
                  <select
                    value={u.role}
                    onChange={(e) => handleRoleChange(u.id, e.target.value)}
                    className="bg-surface-container-low border border-outline-variant rounded px-2.5 py-1 text-xs"
                  >
                    <option value="SUPER_ADMIN">SUPER_ADMIN</option>
                    <option value="ADMIN">ADMIN</option>
                    <option value="MANAGER">MANAGER</option>
                    <option value="EMPLOYEE">EMPLOYEE</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
