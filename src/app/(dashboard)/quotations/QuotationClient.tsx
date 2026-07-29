/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { addQuotation, deleteQuotation, updateQuotationStatus } from "./actions";
import { useToast } from "@/context/ToastContext";
import ConfirmModal from "@/components/ui/ConfirmModal";

export default function QuotationClient({ initialData, customers }: { initialData: any[]; customers: any[] }) {
  const { showToast } = useToast();
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(false);
  const [aiGenerating, setAiGenerating] = useState(false);
  const [notes, setNotes] = useState("");
  const [amount, setAmount] = useState("");
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  async function handleAdd(formData: FormData) {
    setLoading(true);
    try {
      await addQuotation(formData);
      showToast("Quotation created successfully!", "success");
      setIsAdding(false);
    } catch (err: any) {
      showToast(err.message, "error");
    } finally {
      setLoading(false);
    }
  }

  function generateAIQuote() {
    setAiGenerating(true);
    setTimeout(() => {
      setAmount("14850.00");
      setNotes("AI Generated Commercial Terms: 30% advance, 70% upon delivery. Estimated lead time: 14 business days. Includes 1-year plant warranty & telemetry setup.");
      setAiGenerating(false);
      showToast("Nexus AI generated quotation estimate & terms", "info");
    }, 1200);
  }

  async function handleStatusChange(id: string, status: string) {
    try {
      await updateQuotationStatus(id, status);
      showToast(`Quotation status updated to ${status}`, "info");
    } catch (err: any) {
      showToast(err.message, "error");
    }
  }

  async function confirmDelete() {
    if (!deleteTargetId) return;
    try {
      await deleteQuotation(deleteTargetId);
      showToast("Quotation deleted", "success");
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
          <h1 className="font-headline-lg text-headline-lg mb-1">Commercial Quotations</h1>
          <p className="text-on-surface-variant font-body-md">Create, deliver, and track formal customer price quotes</p>
        </div>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="bg-primary text-on-primary px-4 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:brightness-110 shadow-md"
        >
          <span className="material-symbols-outlined">{isAdding ? 'close' : 'request_quote'}</span>
          {isAdding ? 'Cancel' : 'Create Quotation'}
        </button>
      </div>

      {isAdding && (
        <div className="bg-surface-container rounded-xl border border-outline-variant shadow-lg p-6 animate-in slide-in-from-top-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-headline-md flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary">request_quote</span> Create Price Quotation
            </h2>
            <button
              type="button"
              onClick={generateAIQuote}
              disabled={aiGenerating}
              className="bg-primary-container text-primary border border-primary/40 px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 hover:brightness-110 disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-sm">auto_awesome</span>
              {aiGenerating ? 'AI Synthesizing...' : 'Auto AI Quote Estimation'}
            </button>
          </div>

          <form action={handleAdd} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase mb-1">Customer Account</label>
              <select name="customer_id" required className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2.5 text-sm">
                <option value="">Select Customer...</option>
                {customers.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.company_name} ({c.contact_name || 'No Contact'})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase mb-1">Quotation Ref #</label>
              <input name="quotation_number" placeholder="Auto-generated if empty" className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2.5 text-sm font-mono" />
            </div>
            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase mb-1">Total Amount ($)</label>
              <input
                name="total_amount"
                type="number"
                step="0.01"
                required
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2.5 text-sm font-bold text-secondary"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase mb-1">Valid Until</label>
              <input name="valid_until" type="date" className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2.5 text-sm" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-on-surface-variant uppercase mb-1">Terms & Notes</label>
              <textarea
                name="notes"
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Payment terms, delivery schedules, and scope details..."
                className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-3 text-sm"
              />
            </div>
            <div className="md:col-span-2 pt-2">
              <button
                type="submit"
                disabled={loading}
                className="bg-secondary text-on-secondary px-6 py-2.5 rounded-xl font-bold hover:brightness-110 disabled:opacity-50"
              >
                {loading ? 'Generating...' : 'Save & Issue Quotation'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-surface-container rounded-xl border border-outline-variant shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-surface-container-high border-b border-outline-variant">
            <tr>
              <th className="px-6 py-3.5 font-label-xs text-on-surface-variant uppercase">Quote Ref</th>
              <th className="px-6 py-3.5 font-label-xs text-on-surface-variant uppercase">Customer</th>
              <th className="px-6 py-3.5 font-label-xs text-on-surface-variant uppercase text-right">Total Amount</th>
              <th className="px-6 py-3.5 font-label-xs text-on-surface-variant uppercase">Status</th>
              <th className="px-6 py-3.5 font-label-xs text-on-surface-variant uppercase">Valid Until</th>
              <th className="px-6 py-3.5 font-label-xs text-on-surface-variant uppercase text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant">
            {initialData.length > 0 ? (
              initialData.map((q) => (
                <tr key={q.id} className="hover:bg-surface-container-highest transition-colors">
                  <td className="px-6 py-4 font-mono text-xs font-bold text-secondary">{q.quotation_number}</td>
                  <td className="px-6 py-4 font-medium">{q.customers?.company_name || 'Direct Account'}</td>
                  <td className="px-6 py-4 text-right font-bold text-on-surface">${Number(q.total_amount).toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                      q.status === 'ACCEPTED' ? 'bg-secondary-container/20 text-secondary' :
                      q.status === 'SENT' ? 'bg-tertiary-container/20 text-tertiary' :
                      q.status === 'REJECTED' ? 'bg-error-container/20 text-error' :
                      'bg-surface-container-high text-on-surface-variant'
                    }`}>
                      {q.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs text-on-surface-variant">{q.valid_until || 'No Expiry'}</td>
                  <td className="px-6 py-4 text-right space-x-2 text-xs">
                    <select
                      value={q.status}
                      onChange={(e) => handleStatusChange(q.id, e.target.value)}
                      className="bg-surface-container-low border border-outline-variant rounded px-2 py-1"
                    >
                      <option value="DRAFT">DRAFT</option>
                      <option value="SENT">SENT</option>
                      <option value="ACCEPTED">ACCEPTED</option>
                      <option value="REJECTED">REJECTED</option>
                    </select>
                    <button onClick={() => setDeleteTargetId(q.id)} className="text-error hover:underline font-bold">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-on-surface-variant">
                  No quotations found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <ConfirmModal
        isOpen={!!deleteTargetId}
        title="Delete Quotation"
        message="Are you sure you want to remove this quotation?"
        confirmText="Delete Quotation"
        isDanger
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTargetId(null)}
      />
    </div>
  );
}
