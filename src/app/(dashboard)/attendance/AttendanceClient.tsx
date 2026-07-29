/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { addAttendance, deleteAttendance } from "./actions";
import { useToast } from "@/context/ToastContext";
import ConfirmModal from "@/components/ui/ConfirmModal";

export default function AttendanceClient({ initialData, workers }: { initialData: any[]; workers: any[] }) {
  const { showToast } = useToast();
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  async function handleAdd(formData: FormData) {
    setLoading(true);
    try {
      await addAttendance(formData);
      showToast("Attendance logged!", "success");
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
      await deleteAttendance(deleteTargetId);
      showToast("Attendance record removed", "success");
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
          <h1 className="font-headline-lg text-headline-lg mb-1">Worker Attendance Roster</h1>
          <p className="text-on-surface-variant font-body-md">Daily check-in, shift tracking, and leave management</p>
        </div>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="bg-primary text-on-primary px-4 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:brightness-110 shadow-md"
        >
          <span className="material-symbols-outlined">{isAdding ? 'close' : 'co_present'}</span>
          {isAdding ? 'Cancel' : 'Log Attendance'}
        </button>
      </div>

      {isAdding && (
        <div className="bg-surface-container rounded-xl border border-outline-variant shadow-lg p-6 animate-in slide-in-from-top-4">
          <h2 className="font-headline-md mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary">co_present</span> Log Daily Shift Entry
          </h2>
          <form action={handleAdd} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase mb-1">Worker Employee</label>
              <select name="worker_id" required className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2.5 text-sm">
                <option value="">Select Employee...</option>
                {workers.map((w) => (
                  <option key={w.id} value={w.id}>
                    {w.first_name} {w.last_name} ({w.position})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase mb-1">Shift Date</label>
              <input name="work_date" type="date" defaultValue={new Date().toISOString().split('T')[0]} required className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2.5 text-sm" />
            </div>
            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase mb-1">Status</label>
              <select name="status" className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2.5 text-sm">
                <option value="PRESENT">PRESENT</option>
                <option value="LATE">LATE</option>
                <option value="ABSENT">ABSENT</option>
                <option value="ON_LEAVE">ON_LEAVE</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase mb-1">Check In Time</label>
              <input name="check_in" defaultValue="08:00 AM" className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2.5 text-sm" />
            </div>
            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase mb-1">Check Out Time</label>
              <input name="check_out" defaultValue="05:00 PM" className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2.5 text-sm" />
            </div>
            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase mb-1">Notes / Remarks</label>
              <input name="notes" placeholder="Shift notes or excuse details..." className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2.5 text-sm" />
            </div>
            <div className="md:col-span-2 pt-2">
              <button
                type="submit"
                disabled={loading}
                className="bg-secondary text-on-secondary px-6 py-2.5 rounded-xl font-bold hover:brightness-110 disabled:opacity-50"
              >
                {loading ? 'Logging...' : 'Save Shift Log'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-surface-container rounded-xl border border-outline-variant shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-surface-container-high border-b border-outline-variant">
            <tr>
              <th className="px-6 py-3.5 font-label-xs text-on-surface-variant uppercase">Employee</th>
              <th className="px-6 py-3.5 font-label-xs text-on-surface-variant uppercase">Date</th>
              <th className="px-6 py-3.5 font-label-xs text-on-surface-variant uppercase">Status</th>
              <th className="px-6 py-3.5 font-label-xs text-on-surface-variant uppercase">Hours</th>
              <th className="px-6 py-3.5 font-label-xs text-on-surface-variant uppercase text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant">
            {initialData.length > 0 ? (
              initialData.map((att) => (
                <tr key={att.id} className="hover:bg-surface-container-highest transition-colors">
                  <td className="px-6 py-4 font-bold text-on-surface">
                    {att.workers ? `${att.workers.first_name} ${att.workers.last_name}` : 'Plant Technician'}
                    {att.notes && <div className="text-xs font-normal text-on-surface-variant">{att.notes}</div>}
                  </td>
                  <td className="px-6 py-4 text-xs text-on-surface-variant">{att.work_date}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                      att.status === 'PRESENT' ? 'bg-secondary-container/20 text-secondary' :
                      att.status === 'LATE' ? 'bg-tertiary-container/20 text-tertiary' :
                      att.status === 'ABSENT' ? 'bg-error-container/20 text-error' :
                      'bg-surface-container-high text-on-surface-variant'
                    }`}>
                      {att.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs text-on-surface-variant font-mono">
                    {att.check_in} - {att.check_out}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => setDeleteTargetId(att.id)} className="text-error hover:underline font-bold text-xs">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-on-surface-variant">
                  No attendance records logged for today.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <ConfirmModal
        isOpen={!!deleteTargetId}
        title="Delete Attendance Entry"
        message="Are you sure you want to remove this shift attendance log?"
        confirmText="Delete Log"
        isDanger
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTargetId(null)}
      />
    </div>
  );
}
