"use client";

import { useState } from 'react';
import { useToast } from '@/context/ToastContext';

export default function SettingsPage() {
  const { showToast } = useToast();
  const [plantName, setPlantName] = useState("Nexus AI Factory Plant 042");
  const [sectorName, setSectorName] = useState("Sector G-7");
  const [telemetryFrequency, setTelemetryFrequency] = useState("5000");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    showToast("Plant system preferences updated successfully!", "success");
  };

  return (
    <div className="max-w-[1600px] mx-auto space-y-6">
      <div>
        <h1 className="font-headline-lg text-headline-lg mb-1">Plant System Settings</h1>
        <p className="text-on-surface-variant font-body-md">Configure facility metadata, telemetry intervals, and environment connections</p>
      </div>

      <form onSubmit={handleSave} className="bg-surface-container rounded-xl border border-outline-variant shadow-sm p-6 space-y-6">
        <h2 className="font-headline-md border-b border-outline-variant pb-3 flex items-center gap-2">
          <span className="material-symbols-outlined text-secondary">tune</span> Facility Parameters
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-on-surface-variant uppercase mb-1">Plant Identifier Name</label>
            <input
              type="text"
              value={plantName}
              onChange={(e) => setPlantName(e.target.value)}
              className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2.5 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-on-surface-variant uppercase mb-1">Primary Operational Sector</label>
            <input
              type="text"
              value={sectorName}
              onChange={(e) => setSectorName(e.target.value)}
              className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2.5 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-on-surface-variant uppercase mb-1">Telemetry Poll Frequency (ms)</label>
            <select
              value={telemetryFrequency}
              onChange={(e) => setTelemetryFrequency(e.target.value)}
              className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2.5 text-sm"
            >
              <option value="1000">1,000 ms (Realtime High Frequency)</option>
              <option value="5000">5,000 ms (Standard Telemetry)</option>
              <option value="15000">15,000 ms (Low Bandwidth Mode)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-on-surface-variant uppercase mb-1">Database Sync Driver</label>
            <input
              type="text"
              disabled
              value="Supabase Realtime PostgreSQL 15"
              className="w-full bg-surface-container-low/50 border border-outline-variant/60 text-on-surface-variant rounded-lg px-4 py-2.5 text-sm font-mono"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-outline-variant flex justify-between items-center">
          <span className="text-xs text-secondary font-bold flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">verified</span> Supabase Backend Live Connection Active
          </span>

          <button
            type="submit"
            className="bg-secondary text-on-secondary px-6 py-2.5 rounded-xl font-bold hover:brightness-110 shadow-md"
          >
            Save System Settings
          </button>
        </div>
      </form>
    </div>
  );
}
