/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { addProject, deleteProject, updateProjectStatus } from "./actions";
import { useToast } from "@/context/ToastContext";
import ConfirmModal from "@/components/ui/ConfirmModal";

export default function ProjectClient({ initialData }: { initialData: any[] }) {
  const { showToast } = useToast();
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  const filteredProjects = initialData.filter(
    (p) =>
      p.name?.toLowerCase().includes(search.toLowerCase()) ||
      p.description?.toLowerCase().includes(search.toLowerCase())
  );

  async function handleAdd(formData: FormData) {
    setLoading(true);
    try {
      await addProject(formData);
      showToast("Production project initiated!", "success");
      setIsAdding(false);
    } catch (err: any) {
      showToast(err.message, "error");
    } finally {
      setLoading(false);
    }
  }

  async function handleStatusChange(id: string, status: string) {
    try {
      await updateProjectStatus(id, status);
      showToast(`Project status updated to ${status}`, "info");
    } catch (err: any) {
      showToast(err.message, "error");
    }
  }

  async function confirmDelete() {
    if (!deleteTargetId) return;
    try {
      await deleteProject(deleteTargetId);
      showToast("Project removed", "success");
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
          <h1 className="font-headline-lg text-headline-lg mb-1">Production Projects</h1>
          <p className="text-on-surface-variant font-body-md">Track plant installation, expansion, and assembly campaigns</p>
        </div>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="bg-primary text-on-primary px-4 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:brightness-110 shadow-md"
        >
          <span className="material-symbols-outlined">{isAdding ? 'close' : 'assignment_add'}</span>
          {isAdding ? 'Cancel' : 'New Project'}
        </button>
      </div>

      <div className="flex gap-4 bg-surface-container p-4 rounded-xl border border-outline-variant">
        <div className="relative flex-1">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search projects..."
            className="w-full bg-surface-container-low border border-outline-variant rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-secondary"
          />
        </div>
      </div>

      {isAdding && (
        <div className="bg-surface-container rounded-xl border border-outline-variant shadow-lg p-6 animate-in slide-in-from-top-4">
          <h2 className="font-headline-md mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary">assignment</span> Initiate New Project
          </h2>
          <form action={handleAdd} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase mb-1">Project Name</label>
              <input name="name" required placeholder="e.g. Line 4 Automation Upgrade" className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2.5 text-sm" />
            </div>
            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase mb-1">Initial Status</label>
              <select name="status" className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2.5 text-sm">
                <option value="PLANNING">PLANNING</option>
                <option value="ACTIVE">ACTIVE</option>
                <option value="ON_HOLD">ON_HOLD</option>
                <option value="COMPLETED">COMPLETED</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase mb-1">Start Date</label>
              <input name="start_date" type="date" className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2.5 text-sm" />
            </div>
            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase mb-1">Target End Date</label>
              <input name="end_date" type="date" className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2.5 text-sm" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-on-surface-variant uppercase mb-1">Description & Scope</label>
              <textarea name="description" rows={3} placeholder="Project objectives and key deliverables..." className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-3 text-sm" />
            </div>
            <div className="md:col-span-2 pt-2">
              <button
                type="submit"
                disabled={loading}
                className="bg-secondary text-on-secondary px-6 py-2.5 rounded-xl font-bold hover:brightness-110 disabled:opacity-50"
              >
                {loading ? 'Initiating...' : 'Create Project'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((pj) => (
            <div key={pj.id} className="bg-surface-container rounded-xl p-6 border border-outline-variant shadow-sm space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-xl">{pj.name}</h3>
                  <p className="text-sm text-on-surface-variant line-clamp-2 mt-1">{pj.description || 'No description provided.'}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  pj.status === 'ACTIVE' ? 'bg-secondary-container/20 text-secondary' :
                  pj.status === 'COMPLETED' ? 'bg-primary-container/20 text-primary' :
                  'bg-surface-container-high text-on-surface-variant'
                }`}>
                  {pj.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs bg-surface-container-low p-3 rounded-lg border border-outline-variant/50">
                <div>
                  <span className="text-on-surface-variant font-medium">Start Date: </span>
                  <span className="font-bold">{pj.start_date || 'N/A'}</span>
                </div>
                <div>
                  <span className="text-on-surface-variant font-medium">End Date: </span>
                  <span className="font-bold">{pj.end_date || 'N/A'}</span>
                </div>
              </div>

              <div className="flex justify-between items-center pt-2 border-t border-outline-variant text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-on-surface-variant font-bold">Status:</span>
                  <select
                    value={pj.status}
                    onChange={(e) => handleStatusChange(pj.id, e.target.value)}
                    className="bg-surface-container-low border border-outline-variant rounded px-2 py-1"
                  >
                    <option value="PLANNING">PLANNING</option>
                    <option value="ACTIVE">ACTIVE</option>
                    <option value="ON_HOLD">ON_HOLD</option>
                    <option value="COMPLETED">COMPLETED</option>
                  </select>
                </div>

                <button onClick={() => setDeleteTargetId(pj.id)} className="text-error hover:underline font-bold">
                  Remove
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full bg-surface-container rounded-xl p-12 text-center border border-outline-variant">
            <span className="material-symbols-outlined text-5xl text-on-surface-variant mb-2">assignment</span>
            <p className="text-on-surface-variant font-medium">No projects found.</p>
          </div>
        )}
      </div>

      <ConfirmModal
        isOpen={!!deleteTargetId}
        title="Delete Project"
        message="Are you sure you want to remove this project campaign?"
        confirmText="Delete Project"
        isDanger
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTargetId(null)}
      />
    </div>
  );
}
