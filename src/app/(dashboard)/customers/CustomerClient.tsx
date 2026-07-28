/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { addCustomer, deleteCustomer } from "./actions";

export default function CustomerClient({ initialData }: { initialData: any[] }) {
  const [isAdding, setIsAdding] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleAdd(formData: FormData) {
    try {
      setError(null);
      await addCustomer(formData);
      setIsAdding(false);
    } catch (err: any) {
      setError(err.message);
    }
  }

  async function handleDelete(id: string) {
    if (confirm("Are you sure you want to delete this customer?")) {
      try {
        await deleteCustomer(id);
      } catch (err: any) {
        alert(err.message);
      }
    }
  }

  return (
    <div className="max-w-[1600px] mx-auto">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="font-headline-lg text-headline-lg mb-2">Customers</h1>
          <p className="text-on-surface-variant font-body-md">Manage client accounts and contacts</p>
        </div>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="bg-primary text-on-primary px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:brightness-110"
        >
          <span className="material-symbols-outlined">{isAdding ? 'close' : 'add_business'}</span>
          {isAdding ? 'Cancel' : 'Add Customer'}
        </button>
      </div>

      {isAdding && (
        <div className="bg-surface-container rounded-lg border border-outline-variant shadow-sm p-6 mb-8">
          <h2 className="font-headline-md mb-4">Add New Customer</h2>
          {error && <div className="bg-error-container text-on-error-container p-3 rounded mb-4">{error}</div>}
          <form action={handleAdd} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1 text-on-surface-variant">Company Name</label>
              <input name="company_name" required className="w-full bg-surface-container-low border border-outline-variant rounded-md px-4 py-2" />
            </div>
            <div>
              <label className="block text-sm mb-1 text-on-surface-variant">Contact Name</label>
              <input name="contact_name" className="w-full bg-surface-container-low border border-outline-variant rounded-md px-4 py-2" />
            </div>
            <div>
              <label className="block text-sm mb-1 text-on-surface-variant">Email</label>
              <input name="email" type="email" className="w-full bg-surface-container-low border border-outline-variant rounded-md px-4 py-2" />
            </div>
            <div>
              <label className="block text-sm mb-1 text-on-surface-variant">Phone</label>
              <input name="phone" className="w-full bg-surface-container-low border border-outline-variant rounded-md px-4 py-2" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm mb-1 text-on-surface-variant">Address</label>
              <input name="address" className="w-full bg-surface-container-low border border-outline-variant rounded-md px-4 py-2" />
            </div>
            <div className="md:col-span-2 mt-2">
              <button type="submit" className="bg-secondary text-on-secondary px-6 py-2 rounded-lg font-bold hover:brightness-110">Save Customer</button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-surface-container rounded-lg border border-outline-variant shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-surface-container-high border-b border-outline-variant">
            <tr>
              <th className="px-6 py-4 font-label-xs text-on-surface-variant uppercase tracking-wider">Company</th>
              <th className="px-6 py-4 font-label-xs text-on-surface-variant uppercase tracking-wider">Contact Name</th>
              <th className="px-6 py-4 font-label-xs text-on-surface-variant uppercase tracking-wider">Email</th>
              <th className="px-6 py-4 font-label-xs text-on-surface-variant uppercase tracking-wider">Phone</th>
              <th className="px-6 py-4 font-label-xs text-on-surface-variant uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant">
            {initialData.length > 0 ? (
              initialData.map((customer) => (
                <tr key={customer.id} className="hover:bg-surface-container-highest transition-colors">
                  <td className="px-6 py-4 font-medium">{customer.company_name}</td>
                  <td className="px-6 py-4 text-on-surface-variant">{customer.contact_name}</td>
                  <td className="px-6 py-4 text-on-surface-variant">{customer.email}</td>
                  <td className="px-6 py-4 text-on-surface-variant">{customer.phone}</td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => handleDelete(customer.id)} className="text-error hover:underline font-label-sm">Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-on-surface-variant">
                  No customers found. Add a client to get started.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
