"use client";

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';

interface MachineTelemetry {
  id?: string;
  machine_id?: string;
  temperature?: number | string;
  vibration?: number | string;
  rpm?: number | string;
  recorded_at?: string;
}

export default function DashboardPage() {
  const [telemetry, setTelemetry] = useState<MachineTelemetry[]>([]);

  useEffect(() => {
    // Micro-interaction for the health rings animation
    const animateRings = () => {
      document.querySelectorAll('.health-ring').forEach(ring => {
        const htmlRing = ring as HTMLElement;
        const offset = htmlRing.getAttribute('stroke-dashoffset');
        if (offset) {
          htmlRing.style.strokeDashoffset = '100';
          setTimeout(() => {
            htmlRing.style.strokeDashoffset = offset;
          }, 300);
        }
      });
    };
    
    animateRings();
    
    const supabase = createClient();
    
    // Initial fetch (mocking data if none exists)
    const fetchTelemetry = async () => {
      const { data } = await supabase.from('machine_telemetry').select('*').order('recorded_at', { ascending: false }).limit(10);
      if (data) setTelemetry(data);
    };
    fetchTelemetry();

    // Supabase Realtime Subscription
    const channel = supabase.channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'machine_telemetry'
        },
        (payload) => {
          console.log('Realtime Update Received!', payload);
          setTelemetry((prev) => [payload.new, ...prev]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="max-w-[1600px] mx-auto">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-stack-lg mb-8">
        <div>
          <h1 className="font-headline-lg text-headline-lg mb-2">Machine Health Monitor</h1>
          <p className="text-on-surface-variant font-body-md">Real-time status of 24 active assets in Sector G-7</p>
        </div>
        <div className="flex flex-wrap gap-stack-md">
          <div className="flex bg-surface-container p-1 rounded-lg border border-outline-variant">
            <button className="bg-surface-container-high text-primary px-4 py-2 rounded-md font-label-sm text-label-sm">All Machines</button>
            <button className="text-on-surface-variant px-4 py-2 rounded-md font-label-sm text-label-sm hover:text-on-surface">Critical</button>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-12 gap-gutter">
        <div className="col-span-12 xl:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-stack-lg">
          
          <div className="bg-surface-container rounded-lg p-stack-lg border border-outline-variant shadow-sm hover:border-error/50 transition-all cursor-pointer group">
            <div className="flex justify-between items-start mb-stack-lg">
              <div>
                <h4 className="font-headline-md text-headline-md leading-tight">CNC Lathe G7</h4>
                <p className="text-on-surface-variant font-label-xs uppercase tracking-wider">ID: #MAC-8921-X</p>
              </div>
              <div className="relative w-16 h-16">
                <svg className="w-full h-full" viewBox="0 0 36 36">
                  <circle className="stroke-outline-variant" cx="18" cy="18" fill="none" r="16" strokeWidth="3"></circle>
                  <circle className="stroke-error health-ring" cx="18" cy="18" fill="none" r="16" strokeDasharray="100" strokeDashoffset="15" strokeWidth="3"></circle>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="material-symbols-outlined text-error text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>warning</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-stack-md mb-stack-lg">
              <div className="bg-surface-container-low p-3 rounded-lg border border-outline-variant">
                <span className="material-symbols-outlined text-on-surface-variant text-sm mb-1">thermostat</span>
                <div className="font-label-xs text-on-surface-variant uppercase">Temp</div>
                <div className="font-metric-xl text-headline-md text-error">{telemetry.length > 0 && telemetry[0].temperature ? telemetry[0].temperature : '88'}°C</div>
              </div>
              <div className="bg-surface-container-low p-3 rounded-lg border border-outline-variant">
                <span className="material-symbols-outlined text-on-surface-variant text-sm mb-1">vibration</span>
                <div className="font-label-xs text-on-surface-variant uppercase">Vibr.</div>
                <div className="font-metric-xl text-headline-md">4.2<span className="text-label-xs ml-1">mm/s</span></div>
              </div>
              <div className="bg-surface-container-low p-3 rounded-lg border border-outline-variant">
                <span className="material-symbols-outlined text-on-surface-variant text-sm mb-1">speed</span>
                <div className="font-label-xs text-on-surface-variant uppercase">RPM</div>
                <div className="font-metric-xl text-headline-md">12.4k</div>
              </div>
            </div>
          </div>

          <div className="bg-surface-container rounded-lg p-stack-lg border border-outline-variant shadow-sm hover:border-secondary/50 transition-all cursor-pointer group">
            <div className="flex justify-between items-start mb-stack-lg">
              <div>
                <h4 className="font-headline-md text-headline-md leading-tight">Hydraulic Press G7</h4>
                <p className="text-on-surface-variant font-label-xs uppercase tracking-wider">ID: #MAC-1044-Y</p>
              </div>
              <div className="relative w-16 h-16">
                <svg className="w-full h-full" viewBox="0 0 36 36">
                  <circle className="stroke-outline-variant" cx="18" cy="18" fill="none" r="16" strokeWidth="3"></circle>
                  <circle className="stroke-secondary health-ring" cx="18" cy="18" fill="none" r="16" strokeDasharray="100" strokeDashoffset="0" strokeWidth="3"></circle>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="material-symbols-outlined text-secondary text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-stack-md mb-stack-lg">
              <div className="bg-surface-container-low p-3 rounded-lg border border-outline-variant">
                <span className="material-symbols-outlined text-on-surface-variant text-sm mb-1">thermostat</span>
                <div className="font-label-xs text-on-surface-variant uppercase">Temp</div>
                <div className="font-metric-xl text-headline-md">42°C</div>
              </div>
              <div className="bg-surface-container-low p-3 rounded-lg border border-outline-variant">
                <span className="material-symbols-outlined text-on-surface-variant text-sm mb-1">vibration</span>
                <div className="font-label-xs text-on-surface-variant uppercase">Vibr.</div>
                <div className="font-metric-xl text-headline-md">0.8<span className="text-label-xs ml-1">mm/s</span></div>
              </div>
              <div className="bg-surface-container-low p-3 rounded-lg border border-outline-variant">
                <span className="material-symbols-outlined text-on-surface-variant text-sm mb-1">speed</span>
                <div className="font-label-xs text-on-surface-variant uppercase">RPM</div>
                <div className="font-metric-xl text-headline-md">4.1k</div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-12 xl:col-span-4">
          <div className="bg-surface-container-high rounded-lg p-stack-lg border border-outline-variant shadow-lg sticky top-24">
            <div className="flex items-center gap-2 mb-6">
              <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>psychology</span>
              <h2 className="font-headline-md text-headline-md">AI Insights Panel</h2>
            </div>
            
            <div className="space-y-stack-lg">
              <div className="bg-surface-container-highest/50 rounded-lg p-stack-md border border-outline-variant/30 text-center">
                <p className="font-label-xs text-on-surface-variant uppercase tracking-widest mb-1">Remaining Useful Life (RUL)</p>
                <div className="font-display-lg text-display-lg text-primary">42 <span className="text-headline-md">Days</span></div>
              </div>

              <div className="glass-panel rounded-lg p-stack-lg border-l-4 border-primary">
                <div className="flex items-center gap-2 mb-3">
                  <span className="material-symbols-outlined text-primary">engineering</span>
                  <h4 className="font-label-sm text-label-sm text-on-surface">Maintenance Recommendation</h4>
                </div>
                <p className="text-on-surface-variant text-body-md leading-relaxed mb-4">
                  AI identifies a 12% increase in harmonic distortion on CNC Lathe G7.
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-label-xs text-on-surface-variant uppercase tracking-widest">Live Realtime Events {telemetry.length > 0 && `(${telemetry.length})`}</h4>
                {telemetry.slice(0, 3).map((log, idx) => (
                  <div key={idx} className="flex gap-3 text-label-sm">
                    <div className="text-tertiary tabular-nums">NOW</div>
                    <div className="flex-1 text-on-surface">Telemetry updated via Realtime.</div>
                  </div>
                ))}
                <div className="flex gap-3 text-label-sm">
                  <div className="text-on-surface-variant tabular-nums">09:15</div>
                  <div className="flex-1 text-on-surface">System active. Listening for Supabase Realtime...</div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
