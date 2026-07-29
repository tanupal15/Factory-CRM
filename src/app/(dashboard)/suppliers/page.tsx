import { createClient } from "@/utils/supabase/server";
import SupplierClient from "./SupplierClient";

export const revalidate = 0;

export default async function SuppliersPage() {
  const supabase = createClient();
  const { data: suppliers } = await supabase.from("suppliers").select("*").order("created_at", { ascending: false });

  const initialData = (suppliers && suppliers.length > 0) ? suppliers : [
    { id: 's1', name: 'Titanium & Alloy Steel Global', contact_name: 'Robert Patrick', email: 'orders@titaniumsteel.com', phone: '+1 (555) 892-1022' },
    { id: 's2', name: 'Precision CNC Optics Corp', contact_name: 'Elena Vance', email: 'sales@optics-cnc.io', phone: '+1 (555) 431-9088' },
    { id: 's3', name: 'Industrial Lubricants Ltd', contact_name: 'Gordon Freeman', email: 'support@ind-lubricants.com', phone: '+1 (555) 124-7731' }
  ];

  return <SupplierClient initialData={initialData} />;
}
