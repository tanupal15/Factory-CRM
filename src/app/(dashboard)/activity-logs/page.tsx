import { createClient } from "@/utils/supabase/server";

export const revalidate = 0;

export default async function ActivityLogsPage() {
  const supabase = createClient();
  const { data: logs } = await supabase.from("activity_logs").select("*").order("created_at", { ascending: false });

  const initialLogs = (logs && logs.length > 0) ? logs : [
    { id: '1', action: 'MACHINE_STATUS_CHANGE', entity_type: 'machines', entity_id: 'MAC-8921-X', details: 'Status updated from ACTIVE to CRITICAL due to elevated temperature.', user_email: 'admin@plant.com', created_at: new Date().toISOString() },
    { id: '2', action: 'WORKER_ATTENDANCE_LOG', entity_type: 'attendance', entity_id: 'w1', details: 'Marcus Vance checked in at 07:55 AM.', user_email: 'm.vance@plant.com', created_at: new Date(Date.now() - 3600000).toISOString() },
    { id: '3', action: 'INVOICE_ISSUED', entity_type: 'invoices', entity_id: 'INV-40912', details: 'Issued $18,500 invoice to Apex Industrial Robotics.', user_email: 'billing@plant.com', created_at: new Date(Date.now() - 7200000).toISOString() },
    { id: '4', action: 'AI_DIAGNOSTIC_RUN', entity_type: 'ai_insights', entity_id: 'AI-882', details: 'Neural scan identified harmonic vibration anomaly on Lathe G7.', user_email: 'nexus-ai@system', created_at: new Date(Date.now() - 14400000).toISOString() },
  ];

  return (
    <div className="max-w-[1600px] mx-auto space-y-6">
      <div>
        <h1 className="font-headline-lg text-headline-lg mb-1">System Audit Logs</h1>
        <p className="text-on-surface-variant font-body-md">Immutable audit trail of plant actions, security events, and database mutations</p>
      </div>

      <div className="bg-surface-container rounded-xl border border-outline-variant shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-surface-container-high border-b border-outline-variant">
            <tr>
              <th className="px-6 py-3.5 font-label-xs text-on-surface-variant uppercase">Timestamp</th>
              <th className="px-6 py-3.5 font-label-xs text-on-surface-variant uppercase">Action</th>
              <th className="px-6 py-3.5 font-label-xs text-on-surface-variant uppercase">Target Entity</th>
              <th className="px-6 py-3.5 font-label-xs text-on-surface-variant uppercase">User / Source</th>
              <th className="px-6 py-3.5 font-label-xs text-on-surface-variant uppercase">Details</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant">
            {initialLogs.map((log) => (
              <tr key={log.id} className="hover:bg-surface-container-highest transition-colors">
                <td className="px-6 py-4 font-mono text-xs text-on-surface-variant">{new Date(log.created_at).toLocaleString()}</td>
                <td className="px-6 py-4">
                  <span className="px-2.5 py-1 rounded-full bg-surface-container-high text-xs font-bold border border-outline-variant text-secondary">
                    {log.action}
                  </span>
                </td>
                <td className="px-6 py-4 font-mono text-xs text-on-surface">{log.entity_type} ({log.entity_id})</td>
                <td className="px-6 py-4 text-xs font-medium text-primary">{log.user_email}</td>
                <td className="px-6 py-4 text-xs text-on-surface-variant max-w-md truncate">{log.details}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
