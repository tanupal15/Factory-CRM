/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { addInventoryItem, deleteInventoryItem } from "./actions";
import { useToast } from "@/context/ToastContext";
import ConfirmModal from "@/components/ui/ConfirmModal";

export default function InventoryClient({ initialData }: { initialData: any[] }) {
  const { showToast } = useToast();
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  const filteredItems = initialData.filter(
    (item) =>
      item.name?.toLowerCase().includes(search.toLowerCase()) ||
      item.sku?.toLowerCase().includes(search.toLowerCase()) ||
      item.category?.toLowerCase().includes(search.toLowerCase())
  );

  async function handleAdd(formData: FormData) {
    setLoading(true);
    try {
      await addInventoryItem(formData);
      showToast("Inventory stock item added!", "success");
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
      await deleteInventoryItem(deleteTargetId);
      showToast("Inventory item deleted", "success");
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
          <h1 className="font-headline-lg text-headline-lg mb-1">Inventory & Raw Stock</h1>
          <p className="text-on-surface-variant font-body-md">Parts, raw materials, tooling consumables, and stock alerts</p>
        </div>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="bg-primary text-on-primary px-4 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:brightness-110 shadow-md"
        >
          <span className="material-symbols-outlined">{isAdding ? 'close' : 'inventory_2'}</span>
          {isAdding ? 'Cancel' : 'Add Stock Item'}
        </button>
      </div>

      <div className="flex gap-4 bg-surface-container p-4 rounded-xl border border-outline-variant">
        <div className="relative flex-1">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search inventory by name, SKU, or category..."
            className="w-full bg-surface-container-low border border-outline-variant rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-secondary"
          />
        </div>
      </div>

      {isAdding && (
        <div className="bg-surface-container rounded-xl border border-outline-variant shadow-lg p-6 animate-in slide-in-from-top-4">
          <h2 className="font-headline-md mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary">inventory_2</span> Add Inventory Stock Item
          </h2>
          <form action={handleAdd} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase mb-1">SKU</label>
              <input name="sku" required placeholder="e.g. SKU-8842" className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2.5 text-sm font-mono" />
            </div>
            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase mb-1">Item Name</label>
              <input name="name" required placeholder="e.g. Tungsten Carbide Inserts" className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2.5 text-sm" />
            </div>
            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase mb-1">Category</label>
              <input name="category" required placeholder="e.g. Tooling & Cutting" className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2.5 text-sm" />
            </div>
            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase mb-1">Quantity Stocked</label>
              <input name="quantity" type="number" required min="0" defaultValue="10" className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2.5 text-sm" />
            </div>
            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase mb-1">Unit Cost ($)</label>
              <input name="unit_price" type="number" step="0.01" required min="0" placeholder="0.00" className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2.5 text-sm" />
            </div>
            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase mb-1">Description</label>
              <input name="description" placeholder="Additional material details..." className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2.5 text-sm" />
            </div>
            <div className="md:col-span-2 pt-2">
              <button
                type="submit"
                disabled={loading}
                className="bg-secondary text-on-secondary px-6 py-2.5 rounded-xl font-bold hover:brightness-110 disabled:opacity-50"
              >
                {loading ? 'Saving...' : 'Save Stock Item'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-surface-container rounded-xl border border-outline-variant shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-surface-container-high border-b border-outline-variant">
            <tr>
              <th className="px-6 py-3.5 font-label-xs text-on-surface-variant uppercase">SKU</th>
              <th className="px-6 py-3.5 font-label-xs text-on-surface-variant uppercase">Name</th>
              <th className="px-6 py-3.5 font-label-xs text-on-surface-variant uppercase">Category</th>
              <th className="px-6 py-3.5 font-label-xs text-on-surface-variant uppercase text-right">Quantity</th>
              <th className="px-6 py-3.5 font-label-xs text-on-surface-variant uppercase text-right">Unit Price</th>
              <th className="px-6 py-3.5 font-label-xs text-on-surface-variant uppercase text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant">
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <tr key={item.id} className="hover:bg-surface-container-highest transition-colors">
                  <td className="px-6 py-4 font-mono text-xs font-bold text-secondary">{item.sku}</td>
                  <td className="px-6 py-4 font-medium text-on-surface">{item.name}</td>
                  <td className="px-6 py-4 text-on-surface-variant text-xs">
                    <span className="px-2.5 py-1 rounded-full bg-surface-container-high font-semibold border border-outline-variant">
                      {item.category || 'General'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right font-bold">
                    <span className={`px-2 py-0.5 rounded text-xs ${item.quantity < 15 ? 'bg-error-container/20 text-error font-bold' : 'text-on-surface'}`}>
                      {item.quantity} units {item.quantity < 15 && '(LOW)'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right font-bold text-on-surface">${Number(item.unit_price).toFixed(2)}</td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => setDeleteTargetId(item.id)} className="text-error hover:underline font-bold text-xs">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-on-surface-variant">
                  No inventory stock items found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <ConfirmModal
        isOpen={!!deleteTargetId}
        title="Delete Stock Item"
        message="Are you sure you want to remove this item from the inventory database?"
        confirmText="Delete Stock Item"
        isDanger
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTargetId(null)}
      />
    </div>
  );
}
