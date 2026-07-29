/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { addPurchaseOrder, deletePurchaseOrder, updatePOStatus } from "./actions";
import { useToast } from "@/context/ToastContext";
import ConfirmModal from "@/components/ui/ConfirmModal";

export default function POClient({ initialData, suppliers }: { initialData: any[]; suppliers: any[] }) {
  const { showToast } = useToast();
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  async function handleAdd(formData: FormData) {
    setLoading(true);
    try {
      await addPurchaseOrder(formData);
      showToast("Purchase order generated!", "success");
      setIsAdding(false);
    } catch (err: any) {
      showToast(err.message, "error");
    } finally {
      setLoading(false);
    }
  }

  async function handleStatusChange(id: string, status: string) {
    try {
      await updatePOStatus(id, status);
      showToast(`PO status updated to ${status}`, "info");
    } catch (err: any) {
      showToast(err.message, "error");
    }
  }

  async function confirmDelete() {
    if (!deleteTargetId) return;
    try {
      await deletePurchaseOrder(deleteTargetId);
      showToast("Purchase order deleted", "success");
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
          <h1 className="font-headline-lg text-headline-lg mb-1">Purchase Orders</h1>
          <p className="text-on-surface-variant font-body-md">Vendor procurement, raw material orders, and receiving log</p>
        </div>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="bg-primary text-on-primary px-4 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:brightness-110 shadow-md"
        >
          <span className="material-symbols-outlined">{isAdding ? 'close' : 'shopping_bag'}</span>
          {isAdding ? 'Cancel' : 'New Purchase Order'}
        </button>
      </div>

      {isAdding && (
        <div className="bg-surface-container rounded-xl border border-outline-variant shadow-lg p-6 animate-in slide-in-from-top-4">
          <h2 className="font-headline-md mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary">shopping_bag</span> Create Procurement Order
          </h2>
          <form action={handleAdd} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase mb-1">Supplier Vendor</label>
              <select name="supplier_id" required className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2.5 text-sm">
                <option value="">Select Vendor...</option>
                {suppliers.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase mb-1">PO Reference #</label>
              <input name="po_number" placeholder="Auto-generated if empty" className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2.5 text-sm font-mono" />
            </div>
            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase mb-1">Total Procurement Amount ($)</label>
              <input name="total_amount" type="number" step="0.01" required min="0" placeholder="0.00" className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2.5 text-sm" />
            </div>
            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase mb-1">Status</label>
              <select name="status" className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2.5 text-sm">
                <option value="DRAFT">DRAFT</option>
                <option value="ISSUED">ISSUED</option>
                <option value="RECEIVED">RECEIVED</option>
                <option value="CANCELLED">CANCELLED</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase mb-1">Expected Delivery Date</label>
              <input name="expected_delivery" type="date" className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2.5 text-sm" />
            </div>
            <div className="md:col-span-2 pt-2">
              <button
                type="submit"
                disabled={loading}
                className="bg-secondary text-on-secondary px-6 py-2.5 rounded-xl font-bold hover:brightness-110 disabled:opacity-50"
              >
                {loading ? 'Creating...' : 'Save & Issue Purchase Order'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-surface-container rounded-xl border border-outline-variant shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-surface-container-high border-b border-outline-variant">
            <tr>
              <th className="px-6 py-3.5 font-label-xs text-on-surface-variant uppercase">PO Ref #</th>
              <th className="px-6 py-3.5 font-label-xs text-on-surface-variant uppercase">Supplier</th>
              <th className="px-6 py-3.5 font-label-xs text-on-surface-variant uppercase text-right">Total Amount</th>
              <th className="px-6 py-3.5 font-label-xs text-on-surface-variant uppercase">Status</th>
              <th className="px-6 py-3.5 font-label-xs text-on-surface-variant uppercase">Expected Delivery</th>
              <th className="px-6 py-3.5 font-label-xs text-on-surface-variant uppercase text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant">
            {initialData.length > 0 ? (
              initialData.map((po) => (
                <tr key={po.id} className="hover:bg-surface-container-highest transition-colors">
                  <td className="px-6 py-4 font-mono text-xs font-bold text-secondary">{po.po_number}</td>
                  <td className="px-6 py-4 font-medium">{po.suppliers?.name || 'Direct Procurement'}</td>
                  <td className="px-6 py-4 text-right font-bold text-on-surface">${Number(po.total_amount).toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                      po.status === 'RECEIVED' ? 'bg-secondary-container/20 text-secondary' :
                      po.status === 'ISSUED' ? 'bg-tertiary-container/20 text-tertiary' :
                      po.status === 'CANCELLED' ? 'bg-error-container/20 text-error' :
                      'bg-surface-container-high text-on-surface-variant'
                    }`}>
                      {po.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs text-on-surface-variant">{po.expected_delivery || 'N/A'}</td>
                  <td className="px-6 py-4 text-right space-x-2 text-xs">
                    <select
                      value={po.status}
                      onChange={(e) => handleStatusChange(po.id, e.target.value)}
                      className="bg-surface-container-low border border-outline-variant rounded px-2 py-1"
                    >
                      <option value="DRAFT">DRAFT</option>
                      <option value="ISSUED">ISSUED</option>
                      <option value="RECEIVED">RECEIVED</option>
                      <option value="CANCELLED">CANCELLED</option>
                    </select>
                    <button onClick={() => setDeleteTargetId(po.id)} className="text-error hover:underline font-bold">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-on-surface-variant">
                  No purchase orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <ConfirmModal
        isOpen={!!deleteTargetId}
        title="Delete Purchase Order"
        message="Are you sure you want to remove this procurement order?"
        confirmText="Delete PO"
        isDanger
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTargetId(null)}
      />
    </div>
  );
}
