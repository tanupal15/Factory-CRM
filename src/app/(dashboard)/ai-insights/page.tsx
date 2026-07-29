"use client";

import { useState } from 'react';
import AIAssistantModal from '@/components/ai/AIAssistantModal';
import { useToast } from '@/context/ToastContext';

export default function AIInsightsPage() {
  const { showToast } = useToast();
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [analysisRunning, setAnalysisRunning] = useState(false);

  function runTelemetryDiagnostic() {
    setAnalysisRunning(true);
    showToast("Executing Nexus AI neural diagnostic scan across 24 plant telemetry feeds...", "info");
    setTimeout(() => {
      setAnalysisRunning(false);
      showToast("Diagnostic scan completed. 1 warning alert generated for CNC Lathe G7.", "success");
    }, 2000);
  }

  return (
    <div className="max-w-[1600px] mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h1 className="font-headline-lg text-headline-lg mb-1 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-3xl">psychology</span>
            Nexus AI Predictive Intelligence Hub
          </h1>
          <p className="text-on-surface-variant font-body-md">Machine failure prediction, stock forecasting, and automated work orders</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={runTelemetryDiagnostic}
            disabled={analysisRunning}
            className="bg-surface-container-high border border-outline-variant text-on-surface px-4 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-surface-container-highest disabled:opacity-50 text-sm"
          >
            <span className="material-symbols-outlined text-primary">{analysisRunning ? 'sync' : 'search_check'}</span>
            {analysisRunning ? 'Scanning Telemetry...' : 'Run Neural Diagnostic'}
          </button>
          <button
            onClick={() => setIsAIModalOpen(true)}
            className="bg-primary text-on-primary px-4 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:brightness-110 shadow-md text-sm"
          >
            <span className="material-symbols-outlined text-lg">auto_awesome</span>
            Open AI Assistant Drawer
          </button>
        </div>
      </div>

      {/* RUL & High Level Intelligence Banner */}
      <div className="bg-gradient-to-r from-surface-container via-surface-container-high to-surface-container border border-outline-variant rounded-2xl p-6 shadow-xl grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-1 border-b md:border-b-0 md:border-r border-outline-variant/60 pb-4 md:pb-0 md:pr-6">
          <span className="text-xs font-bold uppercase text-on-surface-variant tracking-wider">Predictive RUL Average</span>
          <div className="font-display-lg text-4xl font-bold text-primary">42 <span className="text-lg text-on-surface-variant font-normal">Days</span></div>
          <p className="text-xs text-on-surface-variant">Remaining useful life for Sector G-7 before major overhaul.</p>
        </div>

        <div className="space-y-1 border-b md:border-b-0 md:border-r border-outline-variant/60 pb-4 md:pb-0 md:pr-6">
          <span className="text-xs font-bold uppercase text-on-surface-variant tracking-wider">AI Anomaly Confidence</span>
          <div className="font-display-lg text-4xl font-bold text-secondary">98.4%</div>
          <p className="text-xs text-on-surface-variant">Model accuracy calculated over 1.2M telemetry data points.</p>
        </div>

        <div className="space-y-1">
          <span className="text-xs font-bold uppercase text-on-surface-variant tracking-wider">Preventative Work Orders</span>
          <div className="font-display-lg text-4xl font-bold text-tertiary">3 <span className="text-lg text-on-surface-variant font-normal">Pending</span></div>
          <p className="text-xs text-on-surface-variant">Automated tasks recommended for technicians.</p>
        </div>
      </div>

      {/* AI Diagnostic Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-surface-container rounded-xl p-6 border border-outline-variant shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <span className="px-3 py-1 rounded-full bg-error-container/20 text-error border border-error/30 text-xs font-bold">
              CRITICAL PREDICTION
            </span>
            <span className="text-xs text-on-surface-variant font-mono">ID: #AI-ANOM-882</span>
          </div>

          <div>
            <h3 className="font-bold text-lg">CNC Lathe G7 Harmonic Distortion</h3>
            <p className="text-sm text-on-surface-variant mt-1">
              Neural network identified a 14% increase in bearing harmonic vibration combined with an elevated spindle temperature of 88°C.
            </p>
          </div>

          <div className="bg-surface-container-low p-4 rounded-xl border border-outline-variant text-xs space-y-2">
            <div className="font-bold text-on-surface uppercase tracking-wider">Recommended Action Plan:</div>
            <ul className="list-disc list-inside space-y-1 text-on-surface-variant">
              <li>Inspect bearing lubrication fluid level in Sector G-7.</li>
              <li>Reduce spindle RPM by 10% during upcoming night shift.</li>
              <li>Schedule preventative maintenance task order for tech David Miller.</li>
            </ul>
          </div>
        </div>

        <div className="bg-surface-container rounded-xl p-6 border border-outline-variant shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <span className="px-3 py-1 rounded-full bg-tertiary-container/20 text-tertiary border border-tertiary/30 text-xs font-bold">
              STOCK FORECAST
            </span>
            <span className="text-xs text-on-surface-variant font-mono">ID: #AI-FCST-301</span>
          </div>

          <div>
            <h3 className="font-bold text-lg">Tungsten Carbide Blades Stock Depletion</h3>
            <p className="text-sm text-on-surface-variant mt-1">
              Current burn rate will exhaust SKU-8842 inventory in 4 business days. Lead time from vendor Titanium & Alloy Steel Global is 6 days.
            </p>
          </div>

          <div className="bg-surface-container-low p-4 rounded-xl border border-outline-variant text-xs space-y-2">
            <div className="font-bold text-on-surface uppercase tracking-wider">Recommended Action Plan:</div>
            <ul className="list-disc list-inside space-y-1 text-on-surface-variant">
              <li>Auto-generate Purchase Order PO-88123 for 50 units.</li>
              <li>Notify Procurement Specialist for expedited shipping.</li>
            </ul>
          </div>
        </div>
      </div>

      <AIAssistantModal isOpen={isAIModalOpen} onClose={() => setIsAIModalOpen(false)} />
    </div>
  );
}
