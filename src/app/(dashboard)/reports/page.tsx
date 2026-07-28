import { createClient } from '@/utils/supabase/server';

export default async function ReportsPage() {
  const supabase = createClient();
  const { data: latestOrders } = await supabase.from('orders').select('*, customers(company_name)').order('created_at', { ascending: false }).limit(5);

  return (
    <div className="max-w-[1600px] mx-auto">
      <div className="mb-8">
        <h1 className="font-headline-lg text-headline-lg mb-2">Financial Reports</h1>
        <p className="text-on-surface-variant font-body-md">Export and analyze business performance</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-surface-container rounded-xl p-6 border border-outline-variant">
            <h2 className="font-headline-md mb-6 border-b border-outline-variant pb-4">Revenue Overview</h2>
            <div className="h-64 flex items-end justify-between gap-2">
              {[40, 70, 45, 90, 65, 85, 120].map((val, i) => (
                <div key={i} className="w-full bg-secondary-container/30 rounded-t-sm hover:bg-secondary transition-colors relative group" style={{ height: `${(val/120)*100}%` }}>
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-inverse-surface text-inverse-on-surface text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100">${val}k</div>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-4 text-xs text-on-surface-variant uppercase tracking-wider">
              <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
            </div>
          </div>
          
          <div className="bg-surface-container rounded-xl border border-outline-variant overflow-hidden">
            <div className="p-6 border-b border-outline-variant flex justify-between items-center">
              <h2 className="font-headline-md">Recent Transactions</h2>
              <button className="text-primary hover:underline text-sm font-bold">View All</button>
            </div>
            <table className="w-full text-left">
              <tbody className="divide-y divide-outline-variant">
                {latestOrders?.map(order => (
                  <tr key={order.id} className="hover:bg-surface-container-highest">
                    <td className="px-6 py-4 font-mono text-sm">{order.id.split('-')[0]}</td>
                    <td className="px-6 py-4">{order.customers?.company_name}</td>
                    <td className="px-6 py-4 text-right font-bold">${order.total_amount}</td>
                    <td className="px-6 py-4 text-right">
                      <span className="px-2 py-1 bg-surface-container-high rounded text-xs">{order.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-6">
          <button className="w-full bg-secondary text-on-secondary py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:brightness-110 shadow-md">
            <span className="material-symbols-outlined">download</span>
            Generate PDF Report
          </button>
          <button className="w-full bg-surface-container-high border border-outline-variant text-on-surface py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-surface-container-highest">
            <span className="material-symbols-outlined">table_view</span>
            Export to Excel
          </button>

          <div className="bg-surface-container rounded-xl p-6 border border-outline-variant">
            <h3 className="font-bold mb-4 flex items-center gap-2 text-tertiary">
              <span className="material-symbols-outlined">warning</span> Alerts
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-2"><div className="w-2 h-2 mt-1.5 rounded-full bg-error shrink-0" /> Inventory low on 3 items</li>
              <li className="flex gap-2"><div className="w-2 h-2 mt-1.5 rounded-full bg-tertiary shrink-0" /> 2 pending orders delayed</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
