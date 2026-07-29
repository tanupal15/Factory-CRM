/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { addOrder, deleteOrder } from "./actions";
import { useToast } from "@/context/ToastContext";
import ConfirmModal from "@/components/ui/ConfirmModal";

export default function OrderClient({ initialData, customers }: { initialData: any[]; customers: any[] }) {
  const { showToast } = useToast();
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  const filteredOrders = initialData.filter(
    (o) =>
      o.id?.toLowerCase().includes(search.toLowerCase()) ||
      o.customers?.company_name?.toLowerCase().includes(search.toLowerCase()) ||
      o.status?.toLowerCase().includes(search.toLowerCase())
  );

  async function handleAdd(formData: FormData) {
    setLoading(true);
    try {
      await addOrder(formData);
      showToast("Factory order placed successfully!", "success");
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
      await deleteOrder(deleteTargetId);
      showToast("Order record deleted", "success");
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
          <h1 className="font-headline-lg text-headline-lg mb-1">Production Orders</h1>
          <p className="text-on-surface-variant font-body-md">Manufacturing fulfillment, order queue, and client deliverables</p>
        </div>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="bg-primary text-on-primary px-4 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:brightness-110 shadow-md"
        >
          <span className="material-symbols-outlined">{isAdding ? 'close' : 'add_shopping_cart'}</span>
          {isAdding ? 'Cancel' : 'New Order'}
        </button>
      </div>

      <div className="flex gap-4 bg-surface-container p-4 rounded-xl border border-outline-variant">
        <div className="relative flex-1">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search orders by customer or ID..."
            className="w-full bg-surface-container-low border border-outline-variant rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-secondary"
          />
        </div>
      </div>

      {isAdding && (
        <div className="bg-surface-container rounded-xl border border-outline-variant shadow-lg p-6 animate-in slide-in-from-top-4">
          <h2 className="font-headline-md mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary">shopping_cart</span> Create New Order
          </h2>
          <form action={handleAdd} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase mb-1">Customer Account</label>
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
              <label className="block text-xs font-bold text-on-surface-variant uppercase mb-1">Total Order Amount ($)</label>
              <input name="total_amount" type="number" step="0.01" required min="0" placeholder="0.00" className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2.5 text-sm" />
            </div>
            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase mb-1">Fulfillment Status</label>
              <select name="status" className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2.5 text-sm">
                <option value="PENDING">PENDING</option>
                <option value="PROCESSING">PROCESSING</option>
                <option value="COMPLETED">COMPLETED</option>
                <option value="CANCELLED">CANCELLED</option>
              </select>
            </div>
            <div className="md:col-span-2 pt-2">
              <button
                type="submit"
                disabled={loading}
                className="bg-secondary text-on-secondary px-6 py-2.5 rounded-xl font-bold hover:brightness-110 disabled:opacity-50"
              >
                {loading ? 'Submitting...' : 'Save Order'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-surface-container rounded-xl border border-outline-variant shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-surface-container-high border-b border-outline-variant">
            <tr>
              <th className="px-6 py-3.5 font-label-xs text-on-surface-variant uppercase">Order ID</th>
              <th className="px-6 py-3.5 font-label-xs text-on-surface-variant uppercase">Customer</th>
              <th className="px-6 py-3.5 font-label-xs text-on-surface-variant uppercase text-right">Amount</th>
              <th className="px-6 py-3.5 font-label-xs text-on-surface-variant uppercase">Status</th>
              <th className="px-6 py-3.5 font-label-xs text-on-surface-variant uppercase text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant">
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-surface-container-highest transition-colors">
                  <td className="px-6 py-4 font-mono text-xs font-bold text-secondary">#{String(order.id).substring(0, 8)}</td>
                  <td className="px-6 py-4 font-medium text-on-surface">{order.customers?.company_name || 'Direct Order'}</td>
                  <td className="px-6 py-4 text-right font-bold text-on-surface">${Number(order.total_amount).toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                      order.status === 'COMPLETED' ? 'bg-secondary-container/20 text-secondary' :
                      order.status === 'PROCESSING' ? 'bg-tertiary-container/20 text-tertiary' :
                      order.status === 'PENDING' ? 'bg-primary-container/20 text-primary' :
                      'bg-surface-container-high text-on-surface-variant'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => setDeleteTargetId(order.id)} className="text-error hover:underline font-bold text-xs">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-on-surface-variant">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <ConfirmModal
        isOpen={!!deleteTargetId}
        title="Delete Order"
        message="Are you sure you want to remove this production order?"
        confirmText="Delete Order"
        isDanger
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTargetId(null)}
      />
    </div>
  );
}
