import { createClient } from "@/utils/supabase/server";
import POClient from "./POClient";

export const revalidate = 0;

export default async function PurchaseOrdersPage() {
  const supabase = createClient();
  const [poRes, suppliersRes] = await Promise.all([
    supabase.from("purchase_orders").select("*, suppliers(name)").order("created_at", { ascending: false }),
    supabase.from("suppliers").select("id, name"),
  ]);

  const initialData = (poRes.data && poRes.data.length > 0) ? poRes.data : [
    { id: 'po1', po_number: 'PO-88120', total_amount: 32000.00, status: 'RECEIVED', expected_delivery: '2026-07-20', suppliers: { name: 'Titanium & Alloy Steel Global' } },
    { id: 'po2', po_number: 'PO-88121', total_amount: 14500.00, status: 'ISSUED', expected_delivery: '2026-08-05', suppliers: { name: 'Precision CNC Optics Corp' } },
    { id: 'po3', po_number: 'PO-88122', total_amount: 6800.00, status: 'DRAFT', expected_delivery: '2026-08-15', suppliers: { name: 'Industrial Lubricants Ltd' } }
  ];

  const suppliers = (suppliersRes.data && suppliersRes.data.length > 0) ? suppliersRes.data : [
    { id: 's1', name: 'Titanium & Alloy Steel Global' },
    { id: 's2', name: 'Precision CNC Optics Corp' },
    { id: 's3', name: 'Industrial Lubricants Ltd' }
  ];

  return <POClient initialData={initialData} suppliers={suppliers} />;
}
