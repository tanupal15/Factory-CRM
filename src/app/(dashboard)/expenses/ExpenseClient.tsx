/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { addExpense, deleteExpense } from "./actions";
import { useToast } from "@/context/ToastContext";
import ConfirmModal from "@/components/ui/ConfirmModal";

export default function ExpenseClient({ initialData }: { initialData: any[] }) {
  const { showToast } = useToast();
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  const totalSpent = initialData.reduce((acc, curr) => acc + Number(curr.amount || 0), 0);

  async function handleAdd(formData: FormData) {
    setLoading(true);
    try {
      await addExpense(formData);
      showToast("Expense record added!", "success");
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
      await deleteExpense(deleteTargetId);
      showToast("Expense record deleted", "success");
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
          <h1 className="font-headline-lg text-headline-lg mb-1">Operational Expenses</h1>
          <p className="text-on-surface-variant font-body-md">Track plant overhead, utilities, raw materials, and maintenance expenditures</p>
        </div>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="bg-primary text-on-primary px-4 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:brightness-110 shadow-md"
        >
          <span className="material-symbols-outlined">{isAdding ? 'close' : 'payments'}</span>
          {isAdding ? 'Cancel' : 'Log Expense'}
        </button>
      </div>

      {/* Summary Card */}
      <div className="bg-surface-container rounded-xl p-5 border border-outline-variant flex items-center justify-between">
        <div>
          <span className="text-xs font-bold uppercase text-on-surface-variant tracking-wider">Total Recorded Outflow</span>
          <div className="font-display-lg text-3xl font-bold text-error mt-1">${totalSpent.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
        </div>
        <div className="w-12 h-12 bg-error-container/20 rounded-xl flex items-center justify-center text-error border border-error/30">
          <span className="material-symbols-outlined text-2xl">account_balance_wallet</span>
        </div>
      </div>

      {isAdding && (
        <div className="bg-surface-container rounded-xl border border-outline-variant shadow-lg p-6 animate-in slide-in-from-top-4">
          <h2 className="font-headline-md mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary">payments</span> Log Plant Expenditure
          </h2>
          <form action={handleAdd} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase mb-1">Title / Purpose</label>
              <input name="title" required placeholder="e.g. Monthly Electricity & Power Utility" className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2.5 text-sm" />
            </div>
            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase mb-1">Category</label>
              <select name="category" className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2.5 text-sm">
                <option value="UTILITIES">UTILITIES</option>
                <option value="RAW_MATERIALS">RAW_MATERIALS</option>
                <option value="MAINTENANCE">MAINTENANCE</option>
                <option value="PAYROLL">PAYROLL</option>
                <option value="LOGISTICS">LOGISTICS</option>
                <option value="OPERATIONAL">OPERATIONAL</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase mb-1">Amount ($)</label>
              <input name="amount" type="number" step="0.01" min="0" required placeholder="0.00" className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2.5 text-sm" />
            </div>
            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase mb-1">Expense Date</label>
              <input name="expense_date" type="date" required className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2.5 text-sm" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-on-surface-variant uppercase mb-1">Description</label>
              <input name="description" placeholder="Additional details..." className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2.5 text-sm" />
            </div>
            <div className="md:col-span-2 pt-2">
              <button
                type="submit"
                disabled={loading}
                className="bg-secondary text-on-secondary px-6 py-2.5 rounded-xl font-bold hover:brightness-110 disabled:opacity-50"
              >
                {loading ? 'Logging...' : 'Save Expense Record'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-surface-container rounded-xl border border-outline-variant shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-surface-container-high border-b border-outline-variant">
            <tr>
              <th className="px-6 py-3.5 font-label-xs text-on-surface-variant uppercase">Title</th>
              <th className="px-6 py-3.5 font-label-xs text-on-surface-variant uppercase">Category</th>
              <th className="px-6 py-3.5 font-label-xs text-on-surface-variant uppercase">Date</th>
              <th className="px-6 py-3.5 font-label-xs text-on-surface-variant uppercase text-right">Amount</th>
              <th className="px-6 py-3.5 font-label-xs text-on-surface-variant uppercase text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant">
            {initialData.length > 0 ? (
              initialData.map((e) => (
                <tr key={e.id} className="hover:bg-surface-container-highest transition-colors">
                  <td className="px-6 py-4 font-bold text-on-surface">
                    <div>{e.title}</div>
                    {e.description && <div className="text-xs font-normal text-on-surface-variant">{e.description}</div>}
                  </td>
                  <td className="px-6 py-4 text-on-surface-variant text-xs">
                    <span className="px-2.5 py-1 rounded-full bg-surface-container-high font-semibold border border-outline-variant">
                      {e.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs text-on-surface-variant">{e.expense_date}</td>
                  <td className="px-6 py-4 text-right font-bold text-error">${Number(e.amount).toFixed(2)}</td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => setDeleteTargetId(e.id)} className="text-error hover:underline font-bold text-xs">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-on-surface-variant">
                  No expense records logged.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <ConfirmModal
        isOpen={!!deleteTargetId}
        title="Delete Expense Record"
        message="Are you sure you want to remove this expense entry?"
        confirmText="Delete Expense"
        isDanger
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTargetId(null)}
      />
    </div>
  );
}
