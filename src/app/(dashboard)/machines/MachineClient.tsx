/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { addMachine, deleteMachine, updateMachineStatus } from "./actions";
import { useToast } from "@/context/ToastContext";
import ConfirmModal from "@/components/ui/ConfirmModal";

export default function MachineClient({ initialData }: { initialData: any[] }) {
  const { showToast } = useToast();
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  const filteredMachines = initialData.filter((m) => {
    const matchesSearch =
      m.name?.toLowerCase().includes(search.toLowerCase()) ||
      m.machine_code?.toLowerCase().includes(search.toLowerCase()) ||
      m.sector?.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "ALL" || m.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  async function handleAdd(formData: FormData) {
    setLoading(true);
    try {
      await addMachine(formData);
      showToast("Machine registered successfully!", "success");
      setIsAdding(false);
    } catch (err: any) {
      showToast(err.message, "error");
    } finally {
      setLoading(false);
    }
  }

  async function handleStatusChange(id: string, newStatus: string) {
    try {
      await updateMachineStatus(id, newStatus);
      showToast(`Machine status updated to ${newStatus}`, "info");
    } catch (err: any) {
      showToast(err.message, "error");
    }
  }

  async function confirmDelete() {
    if (!deleteTargetId) return;
    try {
      await deleteMachine(deleteTargetId);
      showToast("Machine record deleted", "success");
    } catch (err: any) {
      showToast(err.message, "error");
    } finally {
      setDeleteTargetId(null);
    }
  }

  return (
    <div className="max-w-[1600px] mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="font-headline-lg text-headline-lg mb-1">Machine Assets Fleet</h1>
          <p className="text-on-surface-variant font-body-md">Monitor status, sector assignment, and telemetry</p>
        </div>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="bg-primary text-on-primary px-4 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:brightness-110 shadow-md"
        >
          <span className="material-symbols-outlined">{isAdding ? 'close' : 'precision_manufacturing'}</span>
          {isAdding ? 'Cancel' : 'Register New Machine'}
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4 bg-surface-container p-4 rounded-xl border border-outline-variant">
        <div className="relative flex-1">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by machine name, code, or sector..."
            className="w-full bg-surface-container-low border border-outline-variant rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-secondary"
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-on-surface-variant">Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-surface-container-low border border-outline-variant rounded-lg px-3 py-2 text-sm"
          >
            <option value="ALL">All Statuses</option>
            <option value="ACTIVE">ACTIVE</option>
            <option value="WARNING">WARNING</option>
            <option value="CRITICAL">CRITICAL</option>
            <option value="MAINTENANCE">MAINTENANCE</option>
          </select>
        </div>
      </div>

      {isAdding && (
        <div className="bg-surface-container rounded-xl border border-outline-variant shadow-lg p-6 animate-in slide-in-from-top-4">
          <h2 className="font-headline-md mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary">add_circle</span> Register Machine Asset
          </h2>
          <form action={handleAdd} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase mb-1">Machine Name</label>
              <input name="name" required placeholder="e.g. CNC Lathe G7" className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2.5 text-sm" />
            </div>
            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase mb-1">Machine Code / ID</label>
              <input name="machine_code" required placeholder="e.g. MAC-8921-X" className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2.5 text-sm font-mono" />
            </div>
            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase mb-1">Sector / Location</label>
              <input name="sector" placeholder="e.g. Sector G-7" className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2.5 text-sm" />
            </div>
            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase mb-1">Initial Status</label>
              <select name="status" className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2.5 text-sm">
                <option value="ACTIVE">ACTIVE</option>
                <option value="WARNING">WARNING</option>
                <option value="CRITICAL">CRITICAL</option>
                <option value="MAINTENANCE">MAINTENANCE</option>
              </select>
            </div>
            <div className="md:col-span-2 pt-2">
              <button
                type="submit"
                disabled={loading}
                className="bg-secondary text-on-secondary px-6 py-2.5 rounded-xl font-bold hover:brightness-110 disabled:opacity-50"
              >
                {loading ? 'Saving...' : 'Save Machine Asset'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Grid view of machines */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredMachines.length > 0 ? (
          filteredMachines.map((machine) => (
            <div
              key={machine.id}
              className="bg-surface-container rounded-xl p-5 border border-outline-variant shadow-sm hover:border-secondary/50 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-bold text-lg leading-snug">{machine.name}</h3>
                    <span className="font-mono text-xs text-on-surface-variant">{machine.machine_code}</span>
                  </div>
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                      machine.status === 'ACTIVE'
                        ? 'bg-secondary-container/20 text-secondary border border-secondary/30'
                        : machine.status === 'WARNING'
                        ? 'bg-tertiary-container/20 text-tertiary border border-tertiary/30'
                        : machine.status === 'CRITICAL'
                        ? 'bg-error-container/20 text-error border border-error/30'
                        : 'bg-surface-container-high text-on-surface-variant'
                    }`}
                  >
                    {machine.status}
                  </span>
                </div>

                <div className="text-xs text-on-surface-variant space-y-1 mb-4">
                  <div>Sector: <span className="font-medium text-on-surface">{machine.sector || 'Unassigned'}</span></div>
                  <div>Registered: <span className="font-medium text-on-surface">{new Date(machine.created_at).toLocaleDateString()}</span></div>
                </div>
              </div>

              <div className="pt-3 border-t border-outline-variant/50 flex justify-between items-center text-xs">
                <select
                  value={machine.status}
                  onChange={(e) => handleStatusChange(machine.id, e.target.value)}
                  className="bg-surface-container-low border border-outline-variant rounded px-2 py-1"
                >
                  <option value="ACTIVE">ACTIVE</option>
                  <option value="WARNING">WARNING</option>
                  <option value="CRITICAL">CRITICAL</option>
                  <option value="MAINTENANCE">MAINTENANCE</option>
                </select>

                <button
                  onClick={() => setDeleteTargetId(machine.id)}
                  className="text-error hover:underline font-bold"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full bg-surface-container rounded-xl p-12 text-center border border-outline-variant">
            <span className="material-symbols-outlined text-5xl text-on-surface-variant mb-2">precision_manufacturing</span>
            <p className="text-on-surface-variant font-medium">No machine assets found matching criteria.</p>
          </div>
        )}
      </div>

      <ConfirmModal
        isOpen={!!deleteTargetId}
        title="Delete Machine Record"
        message="Are you sure you want to delete this machine? Telemetry logs will also be permanently removed."
        confirmText="Delete Machine"
        isDanger
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTargetId(null)}
      />
    </div>
  );
}
