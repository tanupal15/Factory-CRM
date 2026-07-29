import { createClient } from "@/utils/supabase/server";
import InvoiceClient from "./InvoiceClient";

export const revalidate = 0;

export default async function InvoicesPage() {
  const supabase = createClient();
  const [invoicesRes, customersRes] = await Promise.all([
    supabase.from("invoices").select("*, customers(company_name)").order("created_at", { ascending: false }),
    supabase.from("customers").select("id, company_name"),
  ]);

  const initialData = (invoicesRes.data && invoicesRes.data.length > 0) ? invoicesRes.data : [
    { id: 'inv1', invoice_number: 'INV-40912', amount_due: 18500.00, status: 'PAID', due_date: '2026-07-15', customers: { company_name: 'Apex Industrial Robotics' } },
    { id: 'inv2', invoice_number: 'INV-40913', amount_due: 9200.00, status: 'UNPAID', due_date: '2026-08-10', customers: { company_name: 'Vanguard Aerospace Inc.' } },
    { id: 'inv3', invoice_number: 'INV-40914', amount_due: 4300.00, status: 'OVERDUE', due_date: '2026-06-30', customers: { company_name: 'Precision Heavy Machining' } }
  ];

  const customers = (customersRes.data && customersRes.data.length > 0) ? customersRes.data : [
    { id: 'c1', company_name: 'Apex Industrial Robotics' },
    { id: 'c2', company_name: 'Vanguard Aerospace Inc.' },
    { id: 'c3', company_name: 'Precision Heavy Machining' }
  ];

  return <InvoiceClient initialData={initialData} customers={customers} />;
}
