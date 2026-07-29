import { createClient } from "@/utils/supabase/server";
import ReportClient from "./ReportClient";

export const revalidate = 0;

export default async function ReportsPage() {
  const supabase = createClient();
  const { data: reports } = await supabase.from("reports").select("*").order("created_at", { ascending: false });

  const initialData = (reports && reports.length > 0) ? reports : [
    { id: 'rep1', title: 'Monthly Production Throughput & OEE Summary', report_type: 'PRODUCTION', summary: 'Nexus AI Synthesis: Overall plant OEE reached 98.2% with 1,420 units completed. Defect rate remained at an industry-leading 0.4%. Sector G-7 required minor lubricant servicing.', created_at: new Date().toISOString() },
    { id: 'rep2', title: 'Q3 Fiscal Revenue & Overhead Audit', report_type: 'FINANCIAL', summary: 'Nexus AI Synthesis: Gross revenue billed was $312,000 against $63,500 in operational overhead. Net margin ratio expanded by +4.2% YoY.', created_at: new Date().toISOString() },
    { id: 'rep3', title: 'Plant Equipment Predictive Health Audit', report_type: 'EQUIPMENT', summary: 'Nexus AI Synthesis: 24 active machinery assets analyzed. CNC Lathe G7 scheduled for preventative bearing overhaul. Zero unplanned downtime hours recorded.', created_at: new Date().toISOString() }
  ];

  return <ReportClient initialData={initialData} />;
}
