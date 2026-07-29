/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { addSupplier, deleteSupplier } from "./actions";
import { useToast } from "@/context/ToastContext";
import ConfirmModal from "@/components/ui/ConfirmModal";

export default function SupplierClient({ initialData }: { initialData: any[] }) {
  const { showToast } = useToast();
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  const filteredSuppliers = initialData.filter(
    (s) =>
      s.name?.toLowerCase().includes(search.toLowerCase()) ||
      s.contact_name?.toLowerCase().includes(search.toLowerCase()) ||
      s.email?.toLowerCase().includes(search.toLowerCase())
  );

  async function handleAdd(formData: FormData) {
    setLoading(true);
    try {
      await addSupplier(formData);
      showToast("Supplier vendor registered!", "success");
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
      await deleteSupplier(deleteTargetId);
      showToast("Supplier vendor removed", "success");
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
          <h1 className="font-headline-lg text-headline-lg mb-1">Supplier Directory</h1>
          <p className="text-on-surface-variant font-body-md">Vendor directory for raw materials, equipment, and parts</p>
        </div>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="bg-primary text-on-primary px-4 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:brightness-110 shadow-md"
        >
          <span className="material-symbols-outlined">{isAdding ? 'close' : 'local_shipping'}</span>
          {isAdding ? 'Cancel' : 'Register Supplier'}
        </button>
      </div>

      <div className="flex gap-4 bg-surface-container p-4 rounded-xl border border-outline-variant">
        <div className="relative flex-1">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search suppliers by name, contact, or email..."
            className="w-full bg-surface-container-low border border-outline-variant rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-secondary"
          />
        </div>
      </div>

      {isAdding && (
        <div className="bg-surface-container rounded-xl border border-outline-variant shadow-lg p-6 animate-in slide-in-from-top-4">
          <h2 className="font-headline-md mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary">local_shipping</span> Register Vendor
          </h2>
          <form action={handleAdd} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase mb-1">Supplier / Vendor Name</label>
              <input name="name" required placeholder="e.g. Titanium Steel Global" className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2.5 text-sm" />
            </div>
            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase mb-1">Primary Contact Name</label>
              <input name="contact_name" placeholder="e.g. Robert Patrick" className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2.5 text-sm" />
            </div>
            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase mb-1">Email</label>
              <input name="email" type="email" placeholder="vendor@supplier.com" className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2.5 text-sm" />
            </div>
            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase mb-1">Phone</label>
              <input name="phone" placeholder="+1 (555) 019-2831" className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2.5 text-sm" />
            </div>
            <div className="md:col-span-2 pt-2">
              <button
                type="submit"
                disabled={loading}
                className="bg-secondary text-on-secondary px-6 py-2.5 rounded-xl font-bold hover:brightness-110 disabled:opacity-50"
              >
                {loading ? 'Saving...' : 'Save Supplier'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-surface-container rounded-xl border border-outline-variant shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-surface-container-high border-b border-outline-variant">
            <tr>
              <th className="px-6 py-3.5 font-label-xs text-on-surface-variant uppercase">Vendor Name</th>
              <th className="px-6 py-3.5 font-label-xs text-on-surface-variant uppercase">Contact Person</th>
              <th className="px-6 py-3.5 font-label-xs text-on-surface-variant uppercase">Email</th>
              <th className="px-6 py-3.5 font-label-xs text-on-surface-variant uppercase">Phone</th>
              <th className="px-6 py-3.5 font-label-xs text-on-surface-variant uppercase text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant">
            {filteredSuppliers.length > 0 ? (
              filteredSuppliers.map((s) => (
                <tr key={s.id} className="hover:bg-surface-container-highest transition-colors">
                  <td className="px-6 py-4 font-bold text-on-surface">{s.name}</td>
                  <td className="px-6 py-4 text-on-surface-variant font-medium">{s.contact_name || 'N/A'}</td>
                  <td className="px-6 py-4 text-primary text-sm">{s.email || 'N/A'}</td>
                  <td className="px-6 py-4 text-on-surface-variant text-sm">{s.phone || 'N/A'}</td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => setDeleteTargetId(s.id)} className="text-error hover:underline font-bold text-xs">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-on-surface-variant">
                  No suppliers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <ConfirmModal
        isOpen={!!deleteTargetId}
        title="Delete Supplier"
        message="Are you sure you want to remove this supplier vendor?"
        confirmText="Delete Supplier"
        isDanger
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTargetId(null)}
      />
    </div>
  );
}
