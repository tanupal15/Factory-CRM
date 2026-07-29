/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { addTask, deleteTask, updateTaskStatus } from "./actions";
import { useToast } from "@/context/ToastContext";
import ConfirmModal from "@/components/ui/ConfirmModal";

export default function TaskClient({ initialData, workers }: { initialData: any[]; workers: any[] }) {
  const { showToast } = useToast();
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  async function handleAdd(formData: FormData) {
    setLoading(true);
    try {
      await addTask(formData);
      showToast("Work order task delegated!", "success");
      setIsAdding(false);
    } catch (err: any) {
      showToast(err.message, "error");
    } finally {
      setLoading(false);
    }
  }

  async function handleStatusChange(id: string, status: string) {
    try {
      await updateTaskStatus(id, status);
      showToast(`Task status updated to ${status}`, "info");
    } catch (err: any) {
      showToast(err.message, "error");
    }
  }

  async function confirmDelete() {
    if (!deleteTargetId) return;
    try {
      await deleteTask(deleteTargetId);
      showToast("Task removed", "success");
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
          <h1 className="font-headline-lg text-headline-lg mb-1">Work Order Tasks</h1>
          <p className="text-on-surface-variant font-body-md">Plant floor assignments, preventative maintenance work orders, and repairs</p>
        </div>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="bg-primary text-on-primary px-4 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:brightness-110 shadow-md"
        >
          <span className="material-symbols-outlined">{isAdding ? 'close' : 'add_task'}</span>
          {isAdding ? 'Cancel' : 'Create Task Order'}
        </button>
      </div>

      {isAdding && (
        <div className="bg-surface-container rounded-xl border border-outline-variant shadow-lg p-6 animate-in slide-in-from-top-4">
          <h2 className="font-headline-md mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary">task</span> Assign Maintenance / Work Order
          </h2>
          <form action={handleAdd} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase mb-1">Task Title</label>
              <input name="title" required placeholder="e.g. Inspect coolant seal on Lathe G7" className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2.5 text-sm" />
            </div>
            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase mb-1">Assign Technician / Worker</label>
              <select name="assigned_to" className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2.5 text-sm">
                <option value="">Unassigned</option>
                {workers.map((w) => (
                  <option key={w.id} value={w.id}>
                    {w.first_name} {w.last_name} ({w.position})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase mb-1">Priority</label>
              <select name="priority" className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2.5 text-sm">
                <option value="LOW">LOW</option>
                <option value="MEDIUM">MEDIUM</option>
                <option value="HIGH">HIGH</option>
                <option value="URGENT">URGENT</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase mb-1">Due Date</label>
              <input name="due_date" type="date" className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2.5 text-sm" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-on-surface-variant uppercase mb-1">Task Description</label>
              <textarea name="description" rows={3} placeholder="Detailed instructions..." className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-3 text-sm" />
            </div>
            <div className="md:col-span-2 pt-2">
              <button
                type="submit"
                disabled={loading}
                className="bg-secondary text-on-secondary px-6 py-2.5 rounded-xl font-bold hover:brightness-110 disabled:opacity-50"
              >
                {loading ? 'Creating...' : 'Assign Task'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Task Grid Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {['TODO', 'IN_PROGRESS', 'COMPLETED'].map((statusKey) => {
          const colTasks = initialData.filter((t) => (t.status || 'TODO') === statusKey);
          return (
            <div key={statusKey} className="bg-surface-container rounded-xl p-4 border border-outline-variant space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-outline-variant">
                <h3 className="font-bold text-sm text-on-surface flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${
                    statusKey === 'COMPLETED' ? 'bg-secondary' :
                    statusKey === 'IN_PROGRESS' ? 'bg-tertiary' : 'bg-outline'
                  }`} />
                  {statusKey === 'TODO' ? 'Pending Tasks' : statusKey === 'IN_PROGRESS' ? 'In Progress' : 'Completed'}
                </h3>
                <span className="text-xs font-bold text-on-surface-variant bg-surface-container-high px-2 py-0.5 rounded-full">
                  {colTasks.length}
                </span>
              </div>

              <div className="space-y-3">
                {colTasks.length > 0 ? (
                  colTasks.map((t) => (
                    <div key={t.id} className="bg-surface-container-low p-4 rounded-lg border border-outline-variant/60 shadow-sm space-y-2">
                      <div className="flex justify-between items-start">
                        <h4 className="font-bold text-sm">{t.title}</h4>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          t.priority === 'URGENT' ? 'bg-error-container/30 text-error' :
                          t.priority === 'HIGH' ? 'bg-tertiary-container/30 text-tertiary' :
                          'bg-surface-container-high text-on-surface-variant'
                        }`}>
                          {t.priority}
                        </span>
                      </div>
                      {t.description && <p className="text-xs text-on-surface-variant line-clamp-2">{t.description}</p>}
                      <div className="text-[11px] text-on-surface-variant pt-2 border-t border-outline-variant/40 flex justify-between items-center">
                        <div>Assigned: <span className="font-medium text-on-surface">{t.workers ? `${t.workers.first_name} ${t.workers.last_name}` : 'Unassigned'}</span></div>
                        <div className="flex items-center gap-2">
                          <select
                            value={t.status}
                            onChange={(e) => handleStatusChange(t.id, e.target.value)}
                            className="bg-surface-container border border-outline-variant text-[10px] rounded px-1.5 py-0.5"
                          >
                            <option value="TODO">TODO</option>
                            <option value="IN_PROGRESS">IN_PROGRESS</option>
                            <option value="COMPLETED">COMPLETED</option>
                          </select>
                          <button onClick={() => setDeleteTargetId(t.id)} className="text-error font-bold">×</button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-6 text-center text-xs text-on-surface-variant border border-dashed border-outline-variant rounded-lg">
                    No tasks in this lane.
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <ConfirmModal
        isOpen={!!deleteTargetId}
        title="Delete Task Order"
        message="Are you sure you want to remove this work task?"
        confirmText="Delete Task"
        isDanger
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTargetId(null)}
      />
    </div>
  );
}
