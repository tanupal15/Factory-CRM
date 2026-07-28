/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { addWorker, deleteWorker } from "./actions";

export default function WorkerClient({ initialData }: { initialData: any[] }) {
  const [isAdding, setIsAdding] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleAdd(formData: FormData) {
    try {
      setError(null);
      await addWorker(formData);
      setIsAdding(false);
    } catch (err: any) {
      setError(err.message);
    }
  }

  async function handleDelete(id: string) {
    if (confirm("Are you sure you want to remove this worker?")) {
      try {
        await deleteWorker(id);
      } catch (err: any) {
        alert(err.message);
      }
    }
  }

  return (
    <div className="max-w-[1600px] mx-auto">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="font-headline-lg text-headline-lg mb-2">Worker Management</h1>
          <p className="text-on-surface-variant font-body-md">Manage plant employees, roles, and status</p>
        </div>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="bg-primary text-on-primary px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:brightness-110"
        >
          <span className="material-symbols-outlined">{isAdding ? 'close' : 'person_add'}</span>
          {isAdding ? 'Cancel' : 'Add Worker'}
        </button>
      </div>

      {isAdding && (
        <div className="bg-surface-container rounded-lg border border-outline-variant shadow-sm p-6 mb-8">
          <h2 className="font-headline-md mb-4">Add New Worker</h2>
          {error && <div className="bg-error-container text-on-error-container p-3 rounded mb-4">{error}</div>}
          <form action={handleAdd} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1 text-on-surface-variant">First Name</label>
              <input name="first_name" required className="w-full bg-surface-container-low border border-outline-variant rounded-md px-4 py-2" />
            </div>
            <div>
              <label className="block text-sm mb-1 text-on-surface-variant">Last Name</label>
              <input name="last_name" required className="w-full bg-surface-container-low border border-outline-variant rounded-md px-4 py-2" />
            </div>
            <div>
              <label className="block text-sm mb-1 text-on-surface-variant">Position</label>
              <input name="position" required className="w-full bg-surface-container-low border border-outline-variant rounded-md px-4 py-2" />
            </div>
            <div>
              <label className="block text-sm mb-1 text-on-surface-variant">Email</label>
              <input name="email" type="email" className="w-full bg-surface-container-low border border-outline-variant rounded-md px-4 py-2" />
            </div>
            <div>
              <label className="block text-sm mb-1 text-on-surface-variant">Phone</label>
              <input name="phone" className="w-full bg-surface-container-low border border-outline-variant rounded-md px-4 py-2" />
            </div>
            <div>
              <label className="block text-sm mb-1 text-on-surface-variant">Status</label>
              <select name="status" className="w-full bg-surface-container-low border border-outline-variant rounded-md px-4 py-2 text-on-surface">
                <option value="ACTIVE">ACTIVE</option>
                <option value="INACTIVE">INACTIVE</option>
                <option value="ON_LEAVE">ON LEAVE</option>
              </select>
            </div>
            <div className="md:col-span-2 mt-2">
              <button type="submit" className="bg-secondary text-on-secondary px-6 py-2 rounded-lg font-bold hover:brightness-110">Save Worker</button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-surface-container rounded-lg border border-outline-variant shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-surface-container-high border-b border-outline-variant">
            <tr>
              <th className="px-6 py-4 font-label-xs text-on-surface-variant uppercase tracking-wider">Name</th>
              <th className="px-6 py-4 font-label-xs text-on-surface-variant uppercase tracking-wider">Position</th>
              <th className="px-6 py-4 font-label-xs text-on-surface-variant uppercase tracking-wider">Contact</th>
              <th className="px-6 py-4 font-label-xs text-on-surface-variant uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 font-label-xs text-on-surface-variant uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant">
            {initialData.length > 0 ? (
              initialData.map((worker) => (
                <tr key={worker.id} className="hover:bg-surface-container-highest transition-colors">
                  <td className="px-6 py-4 font-medium">{worker.first_name} {worker.last_name}</td>
                  <td className="px-6 py-4 text-on-surface-variant">{worker.position}</td>
                  <td className="px-6 py-4 text-on-surface-variant text-sm">
                    {worker.email && <div className="text-primary">{worker.email}</div>}
                    {worker.phone && <div>{worker.phone}</div>}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${worker.status === 'ACTIVE' ? 'bg-secondary-container/20 text-secondary' : 'bg-surface-container-high text-on-surface-variant'}`}>
                      {worker.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => handleDelete(worker.id)} className="text-error hover:underline font-label-sm">Remove</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-on-surface-variant">
                  No workers found. Add some to get started.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
