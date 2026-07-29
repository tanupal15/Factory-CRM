/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { addReport, deleteReport } from "./actions";
import { useToast } from "@/context/ToastContext";
import ConfirmModal from "@/components/ui/ConfirmModal";

export default function ReportClient({ initialData }: { initialData: any[] }) {
  const { showToast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reportType, setReportType] = useState("PRODUCTION");
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  function handleAutoAISynthesis() {
    setLoading(true);
    setTimeout(() => {
      if (reportType === 'PRODUCTION') {
        setTitle('Monthly Production Throughput & OEE Summary');
        setSummary('Nexus AI Synthesis: Overall plant OEE reached 98.2% with 1,420 units completed. Defect rate remained at an industry-leading 0.4%. Sector G-7 required minor lubricant servicing.');
      } else if (reportType === 'FINANCIAL') {
        setTitle('Q3 Fiscal Revenue & Overhead Audit');
        setSummary('Nexus AI Synthesis: Gross revenue billed was $312,000 against $63,500 in operational overhead. Net margin ratio expanded by +4.2% YoY.');
      } else {
        setTitle('Plant Equipment Predictive Health Audit');
        setSummary('Nexus AI Synthesis: 24 active machinery assets analyzed. CNC Lathe G7 scheduled for preventative bearing overhaul. Zero unplanned downtime hours recorded.');
      }
      setLoading(false);
      showToast("Nexus AI synthesized executive report summary!", "info");
    }, 1000);
  }

  async function handleSave(formData: FormData) {
    try {
      await addReport(formData);
      showToast("Executive report saved and archived!", "success");
      setIsGenerating(false);
    } catch (err: any) {
      showToast(err.message, "error");
    }
  }

  async function confirmDelete() {
    if (!deleteTargetId) return;
    try {
      await deleteReport(deleteTargetId);
      showToast("Report deleted", "success");
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
          <h1 className="font-headline-lg text-headline-lg mb-1">Executive Reports Suite</h1>
          <p className="text-on-surface-variant font-body-md">Generate, synthesize, and export plant operational summaries</p>
        </div>
        <button
          onClick={() => setIsGenerating(!isGenerating)}
          className="bg-primary text-on-primary px-4 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:brightness-110 shadow-md"
        >
          <span className="material-symbols-outlined">{isGenerating ? 'close' : 'bar_chart'}</span>
          {isGenerating ? 'Cancel' : 'Synthesize Report'}
        </button>
      </div>

      {isGenerating && (
        <div className="bg-surface-container rounded-xl border border-outline-variant shadow-lg p-6 animate-in slide-in-from-top-4 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="font-headline-md flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary">bar_chart</span> Synthesize Executive Report
            </h2>
            <button
              type="button"
              onClick={handleAutoAISynthesis}
              disabled={loading}
              className="bg-primary-container text-primary border border-primary/40 px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 hover:brightness-110 disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-sm">auto_awesome</span>
              {loading ? 'AI Synthesizing...' : 'Auto AI Report Generator'}
            </button>
          </div>

          <form action={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase mb-1">Report Category</label>
                <select
                  name="report_type"
                  value={reportType}
                  onChange={(e) => setReportType(e.target.value)}
                  className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2.5 text-sm"
                >
                  <option value="PRODUCTION">PRODUCTION & OEE</option>
                  <option value="FINANCIAL">FINANCIAL & MARGINS</option>
                  <option value="EQUIPMENT">EQUIPMENT & MAINTENANCE</option>
                  <option value="QUALITY">QUALITY & DEFECTS</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase mb-1">Report Title</label>
                <input
                  name="title"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Monthly Production Throughput Audit"
                  className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2.5 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase mb-1">Executive Summary Text</label>
              <textarea
                name="summary"
                rows={4}
                required
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                placeholder="High-level operational takeaways, KPI trends, and recommendations..."
                className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-3 text-sm"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="bg-secondary text-on-secondary px-6 py-2.5 rounded-xl font-bold hover:brightness-110"
              >
                Save Report to Archive
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {initialData.length > 0 ? (
          initialData.map((r) => (
            <div key={r.id} className="bg-surface-container rounded-xl p-6 border border-outline-variant shadow-sm space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <span className="px-2.5 py-1 rounded-full bg-surface-container-high text-xs font-bold border border-outline-variant">
                    {r.report_type}
                  </span>
                  <span className="text-xs text-on-surface-variant">{new Date(r.created_at || Date.now()).toLocaleDateString()}</span>
                </div>
                <h3 className="font-bold text-lg">{r.title}</h3>
                <p className="text-sm text-on-surface-variant line-clamp-4 mt-2 leading-relaxed">{r.summary}</p>
              </div>

              <div className="pt-3 border-t border-outline-variant/60 flex justify-between items-center text-xs">
                <span className="text-secondary font-bold flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">check_circle</span> Archived
                </span>
                <button onClick={() => setDeleteTargetId(r.id)} className="text-error hover:underline font-bold">
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full bg-surface-container rounded-xl p-12 text-center border border-outline-variant">
            <span className="material-symbols-outlined text-5xl text-on-surface-variant mb-2">bar_chart</span>
            <p className="text-on-surface-variant font-medium">No executive reports generated.</p>
          </div>
        )}
      </div>

      <ConfirmModal
        isOpen={!!deleteTargetId}
        title="Delete Report"
        message="Are you sure you want to remove this executive report from the archive?"
        confirmText="Delete Report"
        isDanger
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTargetId(null)}
      />
    </div>
  );
}
