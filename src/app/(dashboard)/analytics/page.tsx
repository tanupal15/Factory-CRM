import { createClient } from '@/utils/supabase/server';

export default async function AnalyticsPage() {
  const supabase = createClient();
  const { count: machineCount } = await supabase.from('machines').select('*', { count: 'exact', head: true });
  const { count: workerCount } = await supabase.from('workers').select('*', { count: 'exact', head: true });
  const { count: orderCount } = await supabase.from('orders').select('*', { count: 'exact', head: true });

  return (
    <div className="max-w-[1600px] mx-auto">
      <div className="mb-8">
        <h1 className="font-headline-lg text-headline-lg mb-2">Analytics & Reports</h1>
        <p className="text-on-surface-variant font-body-md">Factory overview and key performance indicators</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-stack-lg mb-8">
        <div className="bg-surface-container rounded-lg p-stack-lg border border-outline-variant shadow-sm flex items-center justify-between">
          <div>
            <p className="font-label-xs text-on-surface-variant uppercase tracking-wider mb-2">Active Machines</p>
            <h2 className="font-display-lg text-primary">{machineCount || 0}</h2>
          </div>
          <span className="material-symbols-outlined text-4xl text-on-surface-variant/30">precision_manufacturing</span>
        </div>
        
        <div className="bg-surface-container rounded-lg p-stack-lg border border-outline-variant shadow-sm flex items-center justify-between">
          <div>
            <p className="font-label-xs text-on-surface-variant uppercase tracking-wider mb-2">Total Workers</p>
            <h2 className="font-display-lg text-secondary">{workerCount || 0}</h2>
          </div>
          <span className="material-symbols-outlined text-4xl text-on-surface-variant/30">groups</span>
        </div>
        
        <div className="bg-surface-container rounded-lg p-stack-lg border border-outline-variant shadow-sm flex items-center justify-between">
          <div>
            <p className="font-label-xs text-on-surface-variant uppercase tracking-wider mb-2">Pending Orders</p>
            <h2 className="font-display-lg text-tertiary">{orderCount || 0}</h2>
          </div>
          <span className="material-symbols-outlined text-4xl text-on-surface-variant/30">inventory_2</span>
        </div>
      </div>

      <div className="bg-surface-container rounded-lg p-stack-lg border border-outline-variant shadow-sm h-96 flex items-center justify-center">
        <p className="text-on-surface-variant text-center">
          <span className="material-symbols-outlined block text-4xl mb-2">bar_chart</span>
          Detailed chart visualizations will be rendered here.
        </p>
      </div>
    </div>
  );
}
