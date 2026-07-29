"use client";

import { useState } from 'react';
import { useToast } from '@/context/ToastContext';

export default function SupportPage() {
  const { showToast } = useToast();
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !message.trim()) return;
    showToast("Support ticket submitted to Nexus Technical Assistance team!", "success");
    setSubject("");
    setMessage("");
  };

  return (
    <div className="max-w-[1600px] mx-auto space-y-8">
      <div>
        <h1 className="font-headline-lg text-headline-lg mb-1">Factory Technical Support</h1>
        <p className="text-on-surface-variant font-body-md">Submit support inquiries, report hardware integration bugs, or request assistance</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <form onSubmit={handleSubmit} className="bg-surface-container rounded-xl border border-outline-variant shadow-sm p-6 space-y-4">
          <h2 className="font-headline-md flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary">help</span> Submit Technical Support Ticket
          </h2>

          <div>
            <label className="block text-xs font-bold text-on-surface-variant uppercase mb-1">Issue Category / Subject</label>
            <input
              type="text"
              required
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="e.g. Telemetry sensor latency on Sector G-7"
              className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2.5 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-on-surface-variant uppercase mb-1">Detailed Description</label>
            <textarea
              rows={4}
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Describe error symptoms, steps to reproduce, or assistance needed..."
              className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-3 text-sm"
            />
          </div>

          <button
            type="submit"
            className="bg-secondary text-on-secondary px-6 py-2.5 rounded-xl font-bold hover:brightness-110 shadow-md"
          >
            Submit Ticket
          </button>
        </form>

        <div className="bg-surface-container rounded-xl border border-outline-variant shadow-sm p-6 space-y-4">
          <h2 className="font-headline-md flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">quiz</span> Common Integration FAQs
          </h2>

          <div className="space-y-3 text-sm">
            <div className="bg-surface-container-low p-4 rounded-xl border border-outline-variant/60">
              <h4 className="font-bold text-on-surface mb-1">How does Nexus AI predictive maintenance compute RUL?</h4>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                RUL (Remaining Useful Life) uses a combined model analyzing motor vibration frequency, operating thermal delta, and historical breakdown logs stored in Supabase.
              </p>
            </div>

            <div className="bg-surface-container-low p-4 rounded-xl border border-outline-variant/60">
              <h4 className="font-bold text-on-surface mb-1">Is real-time telemetry connected via Supabase postgres_changes?</h4>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Yes. Any insertions into `machine_telemetry` automatically push live payload updates to the dashboard via Supabase WebSocket channels.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
