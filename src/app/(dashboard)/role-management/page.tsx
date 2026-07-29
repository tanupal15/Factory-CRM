"use client";

import { useState } from 'react';
import { useToast } from '@/context/ToastContext';

export default function RoleManagementPage() {
  const { showToast } = useToast();
  const [permissions, setPermissions] = useState({
    SUPER_ADMIN: { read: true, write: true, delete: true, admin: true },
    ADMIN: { read: true, write: true, delete: true, admin: false },
    MANAGER: { read: true, write: true, delete: false, admin: false },
    EMPLOYEE: { read: true, write: false, delete: false, admin: false },
  });

  const togglePerm = (role: keyof typeof permissions, perm: keyof typeof permissions.SUPER_ADMIN) => {
    setPermissions((prev) => ({
      ...prev,
      [role]: {
        ...prev[role],
        [perm]: !prev[role][perm],
      },
    }));
    showToast(`Updated ${perm} permission for ${role}`, "info");
  };

  return (
    <div className="max-w-[1600px] mx-auto space-y-6">
      <div>
        <h1 className="font-headline-lg text-headline-lg mb-1">Role Permission Matrix (RBAC)</h1>
        <p className="text-on-surface-variant font-body-md">Configure granular feature permissions and security access controls</p>
      </div>

      <div className="bg-surface-container rounded-xl border border-outline-variant shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-surface-container-high border-b border-outline-variant">
            <tr>
              <th className="px-6 py-3.5 font-label-xs text-on-surface-variant uppercase">Role Title</th>
              <th className="px-6 py-3.5 font-label-xs text-on-surface-variant uppercase text-center">Read / View</th>
              <th className="px-6 py-3.5 font-label-xs text-on-surface-variant uppercase text-center">Write / Create</th>
              <th className="px-6 py-3.5 font-label-xs text-on-surface-variant uppercase text-center">Delete / Purge</th>
              <th className="px-6 py-3.5 font-label-xs text-on-surface-variant uppercase text-center">System Admin</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant">
            {(Object.keys(permissions) as Array<keyof typeof permissions>).map((role) => (
              <tr key={role} className="hover:bg-surface-container-highest transition-colors">
                <td className="px-6 py-4 font-bold text-on-surface">{role}</td>
                {(['read', 'write', 'delete', 'admin'] as const).map((perm) => (
                  <td key={perm} className="px-6 py-4 text-center">
                    <input
                      type="checkbox"
                      checked={permissions[role][perm]}
                      onChange={() => togglePerm(role, perm)}
                      className="w-4 h-4 accent-secondary rounded cursor-pointer"
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
