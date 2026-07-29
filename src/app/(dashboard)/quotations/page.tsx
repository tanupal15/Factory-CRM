import { createClient } from "@/utils/supabase/server";
import QuotationClient from "./QuotationClient";

export const revalidate = 0;

export default async function QuotationsPage() {
  const supabase = createClient();
  const [quotationsRes, customersRes] = await Promise.all([
    supabase.from("quotations").select("*, customers(company_name)").order("created_at", { ascending: false }),
    supabase.from("customers").select("id, company_name, contact_name"),
  ]);

  const initialData = (quotationsRes.data && quotationsRes.data.length > 0) ? quotationsRes.data : [
    { id: 'q1', quotation_number: 'QT-90210', total_amount: 24500.00, status: 'ACCEPTED', valid_until: '2026-08-30', customers: { company_name: 'Apex Industrial Robotics' } },
    { id: 'q2', quotation_number: 'QT-90211', total_amount: 12400.00, status: 'SENT', valid_until: '2026-09-15', customers: { company_name: 'Vanguard Aerospace Inc.' } },
    { id: 'q3', quotation_number: 'QT-90212', total_amount: 5800.00, status: 'DRAFT', valid_until: '2026-09-01', customers: { company_name: 'Precision Heavy Machining' } }
  ];

  const customers = (customersRes.data && customersRes.data.length > 0) ? customersRes.data : [
    { id: 'c1', company_name: 'Apex Industrial Robotics', contact_name: 'Sarah Connor' },
    { id: 'c2', company_name: 'Vanguard Aerospace Inc.', contact_name: 'Miles Dyson' },
    { id: 'c3', company_name: 'Precision Heavy Machining', contact_name: 'John Matrix' }
  ];

  return <QuotationClient initialData={initialData} customers={customers} />;
}
