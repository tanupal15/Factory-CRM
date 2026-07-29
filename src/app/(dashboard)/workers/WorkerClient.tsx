/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { addWorker, deleteWorker } from "./actions";
import { useToast } from "@/context/ToastContext";
import ConfirmModal from "@/components/ui/ConfirmModal";

export default function WorkerClient({ initialData }: { initialData: any[] }) {
  const { showToast } = useToast();
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  const filteredWorkers = initialData.filter(
    (w) =>
      `${w.first_name} ${w.last_name}`.toLowerCase().includes(search.toLowerCase()) ||
      w.position?.toLowerCase().includes(search.toLowerCase()) ||
      w.email?.toLowerCase().includes(search.toLowerCase())
  );

  async function handleAdd(formData: FormData) {
    setLoading(true);
    try {
      await addWorker(formData);
      showToast("Worker registered!", "success");
      setIsAdding(false);
    } catch (err: any) {
      showToast(err.message, "error");
    } finally {
      setLoading(false);
    }
  }

  async function confirmDelete() {
    if (!deleteTargetId) return;
    try {
      await deleteWorker(deleteTargetId);
      showToast("Worker record removed", "success");
    } catch (err: any) {
      showToast(err.message, "error");
    } finally {
      setDeleteTargetId(null);
    }
  }

  return (
    <div className="max-w-[1600px] mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h1 className="font-headline-lg text-headline-lg mb-1">Worker Roster</h1>
          <p className="text-on-surface-variant font-body-md">Plant employee directory, roles, and shift assignments</p>
        </div>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="bg-primary text-on-primary px-4 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:brightness-110 shadow-md"
        >
          <span className="material-symbols-outlined">{isAdding ? 'close' : 'person_add'}</span>
          {isAdding ? 'Cancel' : 'Add Worker'}
        </button>
      </div>

      <div className="flex gap-4 bg-surface-container p-4 rounded-xl border border-outline-variant">
        <div className="relative flex-1">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search workers by name, position, or email..."
            className="w-full bg-surface-container-low border border-outline-variant rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-secondary"
          />
        </div>
      </div>

      {isAdding && (
        <div className="bg-surface-container rounded-xl border border-outline-variant shadow-lg p-6 animate-in slide-in-from-top-4">
          <h2 className="font-headline-md mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary">person_add</span> Register Plant Worker
          </h2>
          <form action={handleAdd} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase mb-1">First Name</label>
              <input name="first_name" required placeholder="e.g. Marcus" className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2.5 text-sm" />
            </div>
            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase mb-1">Last Name</label>
              <input name="last_name" required placeholder="e.g. Vance" className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2.5 text-sm" />
            </div>
            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase mb-1">Position / Role</label>
              <input name="position" required placeholder="e.g. Lead CNC Operator" className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2.5 text-sm" />
            </div>
            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase mb-1">Email</label>
              <input name="email" type="email" placeholder="m.vance@plant.com" className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2.5 text-sm" />
            </div>
            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase mb-1">Phone</label>
              <input name="phone" placeholder="+1 (555) 019-2831" className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2.5 text-sm" />
            </div>
            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase mb-1">Employment Status</label>
              <select name="status" className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2.5 text-sm">
                <option value="ACTIVE">ACTIVE</option>
                <option value="INACTIVE">INACTIVE</option>
                <option value="ON_LEAVE">ON_LEAVE</option>
              </select>
            </div>
            <div className="md:col-span-2 pt-2">
              <button
                type="submit"
                disabled={loading}
                className="bg-secondary text-on-secondary px-6 py-2.5 rounded-xl font-bold hover:brightness-110 disabled:opacity-50"
              >
                {loading ? 'Registering...' : 'Save Worker'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-surface-container rounded-xl border border-outline-variant shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-surface-container-high border-b border-outline-variant">
            <tr>
              <th className="px-6 py-3.5 font-label-xs text-on-surface-variant uppercase">Full Name</th>
              <th className="px-6 py-3.5 font-label-xs text-on-surface-variant uppercase">Position</th>
              <th className="px-6 py-3.5 font-label-xs text-on-surface-variant uppercase">Contact Info</th>
              <th className="px-6 py-3.5 font-label-xs text-on-surface-variant uppercase">Status</th>
              <th className="px-6 py-3.5 font-label-xs text-on-surface-variant uppercase text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant">
            {filteredWorkers.length > 0 ? (
              filteredWorkers.map((worker) => (
                <tr key={worker.id} className="hover:bg-surface-container-highest transition-colors">
                  <td className="px-6 py-4 font-bold text-on-surface">{worker.first_name} {worker.last_name}</td>
                  <td className="px-6 py-4 text-on-surface-variant font-medium">{worker.position}</td>
                  <td className="px-6 py-4 text-xs">
                    <div className="text-primary font-medium">{worker.email || 'No email'}</div>
                    <div className="text-on-surface-variant">{worker.phone}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                      worker.status === 'ACTIVE' ? 'bg-secondary-container/20 text-secondary' : 'bg-surface-container-high text-on-surface-variant'
                    }`}>
                      {worker.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => setDeleteTargetId(worker.id)} className="text-error hover:underline font-bold text-xs">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-on-surface-variant">
                  No workers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <ConfirmModal
        isOpen={!!deleteTargetId}
        title="Delete Worker Record"
        message="Are you sure you want to remove this employee from the roster?"
        confirmText="Delete Worker"
        isDanger
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTargetId(null)}
      />
    </div>
  );
}
