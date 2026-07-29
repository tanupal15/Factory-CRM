"use client";

import { useState } from 'react';
import { useToast } from '@/context/ToastContext';

export default function ProfilePage() {
  const { showToast } = useToast();
  const [firstName, setFirstName] = useState("Plant");
  const [lastName, setLastName] = useState("Admin");
  const [email, setEmail] = useState("admin@nexus-factory.com");

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    showToast("Profile details updated successfully!", "success");
  };

  return (
    <div className="max-w-[1600px] mx-auto space-y-6">
      <div>
        <h1 className="font-headline-lg text-headline-lg mb-1">User Administrator Profile</h1>
        <p className="text-on-surface-variant font-body-md">Manage personal credentials, notifications, and security keys</p>
      </div>

      <div className="bg-surface-container rounded-xl border border-outline-variant shadow-sm p-6 max-w-2xl space-y-6">
        <div className="flex items-center gap-4 border-b border-outline-variant pb-6">
          <div className="w-16 h-16 rounded-full bg-secondary-container text-secondary flex items-center justify-center text-2xl font-bold border-2 border-secondary">
            PA
          </div>
          <div>
            <h2 className="font-bold text-xl">{firstName} {lastName}</h2>
            <p className="text-xs text-secondary font-semibold uppercase tracking-wider">SUPER_ADMIN Role</p>
          </div>
        </div>

        <form onSubmit={handleUpdateProfile} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase mb-1">First Name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2.5 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase mb-1">Last Name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2.5 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-on-surface-variant uppercase mb-1">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2.5 text-sm"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="bg-secondary text-on-secondary px-6 py-2.5 rounded-xl font-bold hover:brightness-110"
            >
              Update Account Details
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
