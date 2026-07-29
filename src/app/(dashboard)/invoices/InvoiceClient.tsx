/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { addInvoice, deleteInvoice, updateInvoiceStatus } from "./actions";
import { useToast } from "@/context/ToastContext";
import ConfirmModal from "@/components/ui/ConfirmModal";

export default function InvoiceClient({ initialData, customers }: { initialData: any[]; customers: any[] }) {
  const { showToast } = useToast();
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  async function handleAdd(formData: FormData) {
    setLoading(true);
    try {
      await addInvoice(formData);
      showToast("Invoice issued!", "success");
      setIsAdding(false);
    } catch (err: any) {
      showToast(err.message, "error");
    } finally {
      setLoading(false);
    }
  }

  async function handleStatusChange(id: string, status: string) {
    try {
      await updateInvoiceStatus(id, status);
      showToast(`Invoice status updated to ${status}`, "info");
    } catch (err: any) {
      showToast(err.message, "error");
    }
  }

  async function confirmDelete() {
    if (!deleteTargetId) return;
    try {
      await deleteInvoice(deleteTargetId);
      showToast("Invoice deleted", "success");
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
          <h1 className="font-headline-lg text-headline-lg mb-1">Customer Invoices</h1>
          <p className="text-on-surface-variant font-body-md">Billing statements, payment status, and due balances</p>
        </div>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="bg-primary text-on-primary px-4 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:brightness-110 shadow-md"
        >
          <span className="material-symbols-outlined">{isAdding ? 'close' : 'receipt_long'}</span>
          {isAdding ? 'Cancel' : 'Issue New Invoice'}
        </button>
      </div>

      {isAdding && (
        <div className="bg-surface-container rounded-xl border border-outline-variant shadow-lg p-6 animate-in slide-in-from-top-4">
          <h2 className="font-headline-md mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary">receipt_long</span> Issue Billing Invoice
          </h2>
          <form action={handleAdd} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase mb-1">Customer</label>
              <select name="customer_id" required className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2.5 text-sm">
                <option value="">Select Customer...</option>
                {customers.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.company_name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase mb-1">Invoice Ref #</label>
              <input name="invoice_number" placeholder="Auto-generated if empty" className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2.5 text-sm font-mono" />
            </div>
            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase mb-1">Amount Due ($)</label>
              <input name="amount_due" type="number" step="0.01" required min="0" placeholder="0.00" className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2.5 text-sm" />
            </div>
            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase mb-1">Payment Status</label>
              <select name="status" className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2.5 text-sm">
                <option value="UNPAID">UNPAID</option>
                <option value="PARTIAL">PARTIAL</option>
                <option value="PAID">PAID</option>
                <option value="OVERDUE">OVERDUE</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase mb-1">Due Date</label>
              <input name="due_date" type="date" required className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2.5 text-sm" />
            </div>
            <div className="md:col-span-2 pt-2">
              <button
                type="submit"
                disabled={loading}
                className="bg-secondary text-on-secondary px-6 py-2.5 rounded-xl font-bold hover:brightness-110 disabled:opacity-50"
              >
                {loading ? 'Issuing...' : 'Save & Issue Invoice'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-surface-container rounded-xl border border-outline-variant shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-surface-container-high border-b border-outline-variant">
            <tr>
              <th className="px-6 py-3.5 font-label-xs text-on-surface-variant uppercase">Invoice #</th>
              <th className="px-6 py-3.5 font-label-xs text-on-surface-variant uppercase">Customer</th>
              <th className="px-6 py-3.5 font-label-xs text-on-surface-variant uppercase text-right">Amount Due</th>
              <th className="px-6 py-3.5 font-label-xs text-on-surface-variant uppercase">Status</th>
              <th className="px-6 py-3.5 font-label-xs text-on-surface-variant uppercase">Due Date</th>
              <th className="px-6 py-3.5 font-label-xs text-on-surface-variant uppercase text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant">
            {initialData.length > 0 ? (
              initialData.map((inv) => (
                <tr key={inv.id} className="hover:bg-surface-container-highest transition-colors">
                  <td className="px-6 py-4 font-mono text-xs font-bold text-secondary">{inv.invoice_number}</td>
                  <td className="px-6 py-4 font-medium">{inv.customers?.company_name || 'Direct Billing'}</td>
                  <td className="px-6 py-4 text-right font-bold text-on-surface">${Number(inv.amount_due).toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                      inv.status === 'PAID' ? 'bg-secondary-container/20 text-secondary' :
                      inv.status === 'OVERDUE' ? 'bg-error-container/20 text-error' :
                      inv.status === 'PARTIAL' ? 'bg-tertiary-container/20 text-tertiary' :
                      'bg-surface-container-high text-on-surface-variant'
                    }`}>
                      {inv.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs text-on-surface-variant">{inv.due_date || 'N/A'}</td>
                  <td className="px-6 py-4 text-right space-x-2 text-xs">
                    <select
                      value={inv.status}
                      onChange={(e) => handleStatusChange(inv.id, e.target.value)}
                      className="bg-surface-container-low border border-outline-variant rounded px-2 py-1"
                    >
                      <option value="UNPAID">UNPAID</option>
                      <option value="PARTIAL">PARTIAL</option>
                      <option value="PAID">PAID</option>
                      <option value="OVERDUE">OVERDUE</option>
                    </select>
                    <button onClick={() => setDeleteTargetId(inv.id)} className="text-error hover:underline font-bold">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-on-surface-variant">
                  No invoices found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <ConfirmModal
        isOpen={!!deleteTargetId}
        title="Delete Invoice"
        message="Are you sure you want to delete this invoice record?"
        confirmText="Delete Invoice"
        isDanger
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTargetId(null)}
      />
    </div>
  );
}
