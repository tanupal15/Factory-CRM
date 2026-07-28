/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { addInventoryItem, deleteInventoryItem } from "./actions";

export default function InventoryClient({ initialData }: { initialData: any[] }) {
  const [isAdding, setIsAdding] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleAdd(formData: FormData) {
    try {
      setError(null);
      await addInventoryItem(formData);
      setIsAdding(false);
    } catch (err: any) {
      setError(err.message);
    }
  }

  async function handleDelete(id: string) {
    if (confirm("Are you sure you want to delete this item?")) {
      try {
        await deleteInventoryItem(id);
      } catch (err: any) {
        alert(err.message);
      }
    }
  }

  return (
    <div className="max-w-[1600px] mx-auto">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="font-headline-lg text-headline-lg mb-2">Inventory Management</h1>
          <p className="text-on-surface-variant font-body-md">Manage parts, supplies, and stock levels</p>
        </div>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="bg-primary text-on-primary px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:brightness-110"
        >
          <span className="material-symbols-outlined">{isAdding ? 'close' : 'add'}</span>
          {isAdding ? 'Cancel' : 'Add Item'}
        </button>
      </div>

      {isAdding && (
        <div className="bg-surface-container rounded-lg border border-outline-variant shadow-sm p-6 mb-8">
          <h2 className="font-headline-md mb-4">Add New Inventory Item</h2>
          {error && <div className="bg-error-container text-on-error-container p-3 rounded mb-4">{error}</div>}
          <form action={handleAdd} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1 text-on-surface-variant">SKU</label>
              <input name="sku" required className="w-full bg-surface-container-low border border-outline-variant rounded-md px-4 py-2" />
            </div>
            <div>
              <label className="block text-sm mb-1 text-on-surface-variant">Name</label>
              <input name="name" required className="w-full bg-surface-container-low border border-outline-variant rounded-md px-4 py-2" />
            </div>
            <div>
              <label className="block text-sm mb-1 text-on-surface-variant">Category</label>
              <input name="category" required className="w-full bg-surface-container-low border border-outline-variant rounded-md px-4 py-2" />
            </div>
            <div>
              <label className="block text-sm mb-1 text-on-surface-variant">Description</label>
              <input name="description" className="w-full bg-surface-container-low border border-outline-variant rounded-md px-4 py-2" />
            </div>
            <div>
              <label className="block text-sm mb-1 text-on-surface-variant">Quantity</label>
              <input name="quantity" type="number" required min="0" className="w-full bg-surface-container-low border border-outline-variant rounded-md px-4 py-2" />
            </div>
            <div>
              <label className="block text-sm mb-1 text-on-surface-variant">Unit Price ($)</label>
              <input name="unit_price" type="number" step="0.01" required min="0" className="w-full bg-surface-container-low border border-outline-variant rounded-md px-4 py-2" />
            </div>
            <div className="md:col-span-2 mt-2">
              <button type="submit" className="bg-secondary text-on-secondary px-6 py-2 rounded-lg font-bold hover:brightness-110">Save Item</button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-surface-container rounded-lg border border-outline-variant shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-surface-container-high border-b border-outline-variant">
            <tr>
              <th className="px-6 py-4 font-label-xs text-on-surface-variant uppercase tracking-wider">SKU</th>
              <th className="px-6 py-4 font-label-xs text-on-surface-variant uppercase tracking-wider">Name</th>
              <th className="px-6 py-4 font-label-xs text-on-surface-variant uppercase tracking-wider">Category</th>
              <th className="px-6 py-4 font-label-xs text-on-surface-variant uppercase tracking-wider text-right">Qty</th>
              <th className="px-6 py-4 font-label-xs text-on-surface-variant uppercase tracking-wider text-right">Price</th>
              <th className="px-6 py-4 font-label-xs text-on-surface-variant uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant">
            {initialData.length > 0 ? (
              initialData.map((item) => (
                <tr key={item.id} className="hover:bg-surface-container-highest transition-colors">
                  <td className="px-6 py-4 font-mono text-sm">{item.sku}</td>
                  <td className="px-6 py-4 font-medium">{item.name}</td>
                  <td className="px-6 py-4 text-on-surface-variant">
                    <span className="px-2 py-1 rounded-full bg-surface-container-high text-xs">{item.category || 'Uncategorized'}</span>
                  </td>
                  <td className="px-6 py-4 text-right font-medium">{item.quantity}</td>
                  <td className="px-6 py-4 text-right">${item.unit_price}</td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => handleDelete(item.id)} className="text-error hover:underline font-label-sm">Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-on-surface-variant">
                  No inventory items found. Add some to get started.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
