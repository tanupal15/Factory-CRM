/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { addProduct, deleteProduct } from "./actions";
import { useToast } from "@/context/ToastContext";
import ConfirmModal from "@/components/ui/ConfirmModal";

export default function ProductClient({ initialData }: { initialData: any[] }) {
  const { showToast } = useToast();
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  const filteredProducts = initialData.filter(
    (p) =>
      p.name?.toLowerCase().includes(search.toLowerCase()) ||
      p.sku?.toLowerCase().includes(search.toLowerCase()) ||
      p.category?.toLowerCase().includes(search.toLowerCase())
  );

  async function handleAdd(formData: FormData) {
    setLoading(true);
    try {
      await addProduct(formData);
      showToast("Product added to catalog!", "success");
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
      await deleteProduct(deleteTargetId);
      showToast("Product deleted from catalog", "success");
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
          <h1 className="font-headline-lg text-headline-lg mb-1">Products Catalog</h1>
          <p className="text-on-surface-variant font-body-md">Manufactured goods, SKUs, and retail pricing</p>
        </div>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="bg-primary text-on-primary px-4 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:brightness-110 shadow-md"
        >
          <span className="material-symbols-outlined">{isAdding ? 'close' : 'add_box'}</span>
          {isAdding ? 'Cancel' : 'Add Product SKU'}
        </button>
      </div>

      <div className="flex gap-4 bg-surface-container p-4 rounded-xl border border-outline-variant">
        <div className="relative flex-1">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products by name, SKU, or category..."
            className="w-full bg-surface-container-low border border-outline-variant rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-secondary"
          />
        </div>
      </div>

      {isAdding && (
        <div className="bg-surface-container rounded-xl border border-outline-variant shadow-lg p-6 animate-in slide-in-from-top-4">
          <h2 className="font-headline-md mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary">category</span> Add Product to Catalog
          </h2>
          <form action={handleAdd} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase mb-1">Product Name</label>
              <input name="name" required placeholder="e.g. Heavy Duty Servo Arm" className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2.5 text-sm" />
            </div>
            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase mb-1">SKU</label>
              <input name="sku" placeholder="Auto-generated if empty" className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2.5 text-sm font-mono" />
            </div>
            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase mb-1">Category</label>
              <input name="category" placeholder="e.g. Hydraulics / Actuators" className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2.5 text-sm" />
            </div>
            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase mb-1">Unit Price ($)</label>
              <input name="unit_price" type="number" step="0.01" min="0" required placeholder="0.00" className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2.5 text-sm" />
            </div>
            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase mb-1">Stock Quantity</label>
              <input name="stock_quantity" type="number" min="0" required defaultValue="0" className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2.5 text-sm" />
            </div>
            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase mb-1">Description</label>
              <input name="description" placeholder="Brief technical specifications..." className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2.5 text-sm" />
            </div>
            <div className="md:col-span-2 pt-2">
              <button
                type="submit"
                disabled={loading}
                className="bg-secondary text-on-secondary px-6 py-2.5 rounded-xl font-bold hover:brightness-110 disabled:opacity-50"
              >
                {loading ? 'Saving...' : 'Save Product'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-surface-container rounded-xl border border-outline-variant shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-surface-container-high border-b border-outline-variant">
            <tr>
              <th className="px-6 py-3.5 font-label-xs text-on-surface-variant uppercase tracking-wider">SKU</th>
              <th className="px-6 py-3.5 font-label-xs text-on-surface-variant uppercase tracking-wider">Product Name</th>
              <th className="px-6 py-3.5 font-label-xs text-on-surface-variant uppercase tracking-wider">Category</th>
              <th className="px-6 py-3.5 font-label-xs text-on-surface-variant uppercase tracking-wider text-right">Unit Price</th>
              <th className="px-6 py-3.5 font-label-xs text-on-surface-variant uppercase tracking-wider text-right">Stock</th>
              <th className="px-6 py-3.5 font-label-xs text-on-surface-variant uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((p) => (
                <tr key={p.id} className="hover:bg-surface-container-highest transition-colors">
                  <td className="px-6 py-4 font-mono text-xs font-bold text-secondary">{p.sku}</td>
                  <td className="px-6 py-4 font-medium">
                    <div>{p.name}</div>
                    {p.description && <div className="text-xs text-on-surface-variant">{p.description}</div>}
                  </td>
                  <td className="px-6 py-4 text-on-surface-variant text-sm">
                    <span className="px-2.5 py-1 rounded-full bg-surface-container-high text-xs font-medium border border-outline-variant">
                      {p.category || 'General'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right font-bold text-on-surface">${Number(p.unit_price).toFixed(2)}</td>
                  <td className="px-6 py-4 text-right font-medium">
                    <span className={`px-2 py-0.5 rounded text-xs ${p.stock_quantity < 10 ? 'bg-error-container/20 text-error font-bold' : 'text-on-surface'}`}>
                      {p.stock_quantity} units
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => setDeleteTargetId(p.id)} className="text-error hover:underline font-bold text-xs">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-on-surface-variant">
                  No products found. Add items to catalog.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <ConfirmModal
        isOpen={!!deleteTargetId}
        title="Delete Product SKU"
        message="Are you sure you want to remove this product from the catalog?"
        confirmText="Delete Product"
        isDanger
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTargetId(null)}
      />
    </div>
  );
}
