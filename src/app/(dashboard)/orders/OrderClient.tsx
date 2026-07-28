/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { addOrder, deleteOrder } from "./actions";

export default function OrderClient({ initialData, customers }: { initialData: any[], customers: any[] }) {
  const [isAdding, setIsAdding] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleAdd(formData: FormData) {
    try {
      setError(null);
      await addOrder(formData);
      setIsAdding(false);
    } catch (err: any) {
      setError(err.message);
    }
  }

  async function handleDelete(id: string) {
    if (confirm("Are you sure you want to delete this order?")) {
      try {
        await deleteOrder(id);
      } catch (err: any) {
        alert(err.message);
      }
    }
  }

  return (
    <div className="max-w-[1600px] mx-auto">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="font-headline-lg text-headline-lg mb-2">Orders</h1>
          <p className="text-on-surface-variant font-body-md">Track production and fulfillment</p>
        </div>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="bg-primary text-on-primary px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:brightness-110"
        >
          <span className="material-symbols-outlined">{isAdding ? 'close' : 'add_shopping_cart'}</span>
          {isAdding ? 'Cancel' : 'New Order'}
        </button>
      </div>

      {isAdding && (
        <div className="bg-surface-container rounded-lg border border-outline-variant shadow-sm p-6 mb-8">
          <h2 className="font-headline-md mb-4">Create New Order</h2>
          {error && <div className="bg-error-container text-on-error-container p-3 rounded mb-4">{error}</div>}
          <form action={handleAdd} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1 text-on-surface-variant">Customer</label>
              <select name="customer_id" required className="w-full bg-surface-container-low border border-outline-variant rounded-md px-4 py-2 text-on-surface">
                <option value="">Select a Customer...</option>
                {customers.map(c => <option key={c.id} value={c.id}>{c.company_name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm mb-1 text-on-surface-variant">Total Amount ($)</label>
              <input name="total_amount" type="number" step="0.01" required min="0" className="w-full bg-surface-container-low border border-outline-variant rounded-md px-4 py-2" />
            </div>
            <div>
              <label className="block text-sm mb-1 text-on-surface-variant">Status</label>
              <select name="status" className="w-full bg-surface-container-low border border-outline-variant rounded-md px-4 py-2 text-on-surface">
                <option value="PENDING">PENDING</option>
                <option value="PROCESSING">PROCESSING</option>
                <option value="COMPLETED">COMPLETED</option>
                <option value="CANCELLED">CANCELLED</option>
              </select>
            </div>
            
            <div className="md:col-span-2 mt-2">
              <button type="submit" className="bg-secondary text-on-secondary px-6 py-2 rounded-lg font-bold hover:brightness-110">Save Order</button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-surface-container rounded-lg border border-outline-variant shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-surface-container-high border-b border-outline-variant">
            <tr>
              <th className="px-6 py-4 font-label-xs text-on-surface-variant uppercase tracking-wider">Order ID</th>
              <th className="px-6 py-4 font-label-xs text-on-surface-variant uppercase tracking-wider">Customer</th>
              <th className="px-6 py-4 font-label-xs text-on-surface-variant uppercase tracking-wider">Amount</th>
              <th className="px-6 py-4 font-label-xs text-on-surface-variant uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 font-label-xs text-on-surface-variant uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant">
            {initialData.length > 0 ? (
              initialData.map((order) => (
                <tr key={order.id} className="hover:bg-surface-container-highest transition-colors">
                  <td className="px-6 py-4 font-mono text-xs">{order.id.split('-')[0]}</td>
                  <td className="px-6 py-4 font-medium">{order.customers?.company_name || 'Unknown'}</td>
                  <td className="px-6 py-4 text-on-surface-variant">${order.total_amount}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                      order.status === 'COMPLETED' ? 'bg-secondary-container/20 text-secondary' : 
                      order.status === 'PENDING' ? 'bg-tertiary-container/20 text-tertiary' :
                      'bg-surface-container-high text-on-surface-variant'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => handleDelete(order.id)} className="text-error hover:underline font-label-sm">Delete</button>
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
    </div>
  );
}
