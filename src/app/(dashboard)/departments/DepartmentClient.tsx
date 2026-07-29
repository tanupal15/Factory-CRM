/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { addDepartment, deleteDepartment } from "./actions";
import { useToast } from "@/context/ToastContext";
import ConfirmModal from "@/components/ui/ConfirmModal";

export default function DepartmentClient({ initialData }: { initialData: any[] }) {
  const { showToast } = useToast();
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  async function handleAdd(formData: FormData) {
    setLoading(true);
    try {
      await addDepartment(formData);
      showToast("Department created!", "success");
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
      await deleteDepartment(deleteTargetId);
      showToast("Department removed", "success");
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
          <h1 className="font-headline-lg text-headline-lg mb-1">Plant Departments</h1>
          <p className="text-on-surface-variant font-body-md">Factory division structure, headcounts, and sector allocation</p>
        </div>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="bg-primary text-on-primary px-4 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:brightness-110 shadow-md"
        >
          <span className="material-symbols-outlined">{isAdding ? 'close' : 'domain_add'}</span>
          {isAdding ? 'Cancel' : 'Add Department'}
        </button>
      </div>

      {isAdding && (
        <div className="bg-surface-container rounded-xl border border-outline-variant shadow-lg p-6 animate-in slide-in-from-top-4">
          <h2 className="font-headline-md mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary">domain</span> Add Plant Department
          </h2>
          <form action={handleAdd} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase mb-1">Department Name</label>
              <input name="name" required placeholder="e.g. Precision Machining & Milling" className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2.5 text-sm" />
            </div>
            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase mb-1">Description & Objectives</label>
              <textarea name="description" rows={3} placeholder="Department scope and responsibility..." className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-3 text-sm" />
            </div>
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="bg-secondary text-on-secondary px-6 py-2.5 rounded-xl font-bold hover:brightness-110 disabled:opacity-50"
              >
                {loading ? 'Saving...' : 'Save Department'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {initialData.length > 0 ? (
          initialData.map((d) => (
            <div key={d.id} className="bg-surface-container rounded-xl p-6 border border-outline-variant shadow-sm space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-lg">{d.name}</h3>
                  <span className="material-symbols-outlined text-primary">domain</span>
                </div>
                <p className="text-sm text-on-surface-variant line-clamp-3 mt-1">{d.description || 'No description provided.'}</p>
              </div>

              <div className="pt-3 border-t border-outline-variant flex justify-between items-center text-xs">
                <span className="text-on-surface-variant font-medium">Headcount: Active</span>
                <button onClick={() => setDeleteTargetId(d.id)} className="text-error hover:underline font-bold">
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full bg-surface-container rounded-xl p-12 text-center border border-outline-variant">
            <span className="material-symbols-outlined text-5xl text-on-surface-variant mb-2">domain</span>
            <p className="text-on-surface-variant font-medium">No departments found.</p>
          </div>
        )}
      </div>

      <ConfirmModal
        isOpen={!!deleteTargetId}
        title="Delete Department"
        message="Are you sure you want to remove this department?"
        confirmText="Delete Department"
        isDanger
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTargetId(null)}
      />
    </div>
  );
}
