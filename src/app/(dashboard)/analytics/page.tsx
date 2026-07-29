"use client";

import { useState } from 'react';

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('30D');

  return (
    <div className="max-w-[1600px] mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h1 className="font-headline-lg text-headline-lg mb-1">Factory Analytics & Metrics</h1>
          <p className="text-on-surface-variant font-body-md">Overall Equipment Effectiveness (OEE), throughput, and fiscal performance</p>
        </div>
        <div className="flex bg-surface-container p-1 rounded-xl border border-outline-variant text-xs">
          {['7D', '30D', '90D', 'YTD'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-lg font-bold transition-all ${
                timeRange === range ? 'bg-secondary text-on-secondary shadow' : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-surface-container rounded-xl p-5 border border-outline-variant shadow-sm space-y-2">
          <div className="flex justify-between items-center text-xs font-bold text-on-surface-variant uppercase tracking-wider">
            <span>Overall OEE Index</span>
            <span className="material-symbols-outlined text-secondary">speed</span>
          </div>
          <div className="font-display-lg text-3xl font-bold text-secondary">98.2%</div>
          <div className="text-xs text-secondary font-semibold flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">trending_up</span> +2.4% vs previous {timeRange}
          </div>
        </div>

        <div className="bg-surface-container rounded-xl p-5 border border-outline-variant shadow-sm space-y-2">
          <div className="flex justify-between items-center text-xs font-bold text-on-surface-variant uppercase tracking-wider">
            <span>Availability Rate</span>
            <span className="material-symbols-outlined text-primary">schedule</span>
          </div>
          <div className="font-display-lg text-3xl font-bold text-primary">99.1%</div>
          <div className="text-xs text-on-surface-variant">Scheduled uptime: 714 hrs</div>
        </div>

        <div className="bg-surface-container rounded-xl p-5 border border-outline-variant shadow-sm space-y-2">
          <div className="flex justify-between items-center text-xs font-bold text-on-surface-variant uppercase tracking-wider">
            <span>Quality Yield</span>
            <span className="material-symbols-outlined text-tertiary">check_circle</span>
          </div>
          <div className="font-display-lg text-3xl font-bold text-tertiary">99.6%</div>
          <div className="text-xs text-on-surface-variant">Defect rate: 0.4% (42 units)</div>
        </div>

        <div className="bg-surface-container rounded-xl p-5 border border-outline-variant shadow-sm space-y-2">
          <div className="flex justify-between items-center text-xs font-bold text-on-surface-variant uppercase tracking-wider">
            <span>Gross Revenue Margin</span>
            <span className="material-symbols-outlined text-secondary">finance_chip</span>
          </div>
          <div className="font-display-lg text-3xl font-bold text-on-surface">$248,500</div>
          <div className="text-xs text-secondary font-semibold">+18.5% YoY growth</div>
        </div>
      </div>

      {/* Visual Charts & Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sector OEE Performance */}
        <div className="bg-surface-container rounded-xl p-6 border border-outline-variant shadow-sm space-y-4">
          <h3 className="font-bold text-lg flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary">bar_chart</span> Plant Sector OEE Breakdown
          </h3>

          <div className="space-y-4 pt-2">
            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span>Sector G-7 (CNC Lathes & Hydraulic Press)</span>
                <span className="text-secondary">98.2%</span>
              </div>
              <div className="w-full bg-surface-container-high h-3 rounded-full overflow-hidden">
                <div className="bg-secondary h-full rounded-full" style={{ width: '98.2%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span>Sector B-3 (Stamping & Sheet Metal)</span>
                <span className="text-primary">94.8%</span>
              </div>
              <div className="w-full bg-surface-container-high h-3 rounded-full overflow-hidden">
                <div className="bg-primary h-full rounded-full" style={{ width: '94.8%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span>Assembly Line 2 (Robotic Welding)</span>
                <span className="text-tertiary">96.5%</span>
              </div>
              <div className="w-full bg-surface-container-high h-3 rounded-full overflow-hidden">
                <div className="bg-tertiary h-full rounded-full" style={{ width: '96.5%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span>Plastics Bay (Injection Molding)</span>
                <span className="text-error">89.1%</span>
              </div>
              <div className="w-full bg-surface-container-high h-3 rounded-full overflow-hidden">
                <div className="bg-error h-full rounded-full" style={{ width: '89.1%' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Revenue vs Expense Financial Analysis */}
        <div className="bg-surface-container rounded-xl p-6 border border-outline-variant shadow-sm space-y-4">
          <h3 className="font-bold text-lg flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">pie_chart</span> Financial Efficiency Ratio
          </h3>

          <div className="bg-surface-container-low p-4 rounded-xl border border-outline-variant/60 space-y-3">
            <div className="flex justify-between items-center text-sm">
              <span className="text-on-surface-variant font-medium">Billed Orders Total</span>
              <span className="font-bold text-secondary">$312,000.00</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-on-surface-variant font-medium">Operational Expenses</span>
              <span className="font-bold text-error">$63,500.00</span>
            </div>
            <div className="border-t border-outline-variant pt-2 flex justify-between items-center text-base font-bold">
              <span>Net Plant Contribution Margin</span>
              <span className="text-primary">$248,500.00</span>
            </div>
          </div>

          <div className="p-4 bg-primary-container/20 rounded-xl border border-primary/30 text-xs text-on-surface-variant space-y-1">
            <div className="font-bold text-primary flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">auto_awesome</span> Nexus AI Financial Insight
            </div>
            <p>Plant net margin is performing at 79.6% efficiency. Raw material cost optimization on Sector B-3 could yield an extra $12,400 in quarterly net margin.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
