import { createClient } from "@/utils/supabase/server";
import MachineClient from "./MachineClient";

export const revalidate = 0;

export default async function MachinesPage() {
  const supabase = createClient();
  const { data: machines } = await supabase.from("machines").select("*").order("created_at", { ascending: false });

  // Fallback demo data if DB is empty
  const initialData = (machines && machines.length > 0) ? machines : [
    { id: 'm1', name: 'CNC Lathe G7', machine_code: 'MAC-8921-X', sector: 'Sector G-7', status: 'CRITICAL', created_at: new Date().toISOString() },
    { id: 'm2', name: 'Hydraulic Press G7', machine_code: 'MAC-1044-Y', sector: 'Sector G-7', status: 'ACTIVE', created_at: new Date().toISOString() },
    { id: 'm3', name: 'Robotic Arm Welder 04', machine_code: 'MAC-3021-Z', sector: 'Assembly Line 2', status: 'ACTIVE', created_at: new Date().toISOString() },
    { id: 'm4', name: 'Stamping Press 12', machine_code: 'MAC-4410-A', sector: 'Sector B-3', status: 'WARNING', created_at: new Date().toISOString() },
    { id: 'm5', name: 'Injection Molding Unit 02', machine_code: 'MAC-9002-M', sector: 'Plastics Bay', status: 'MAINTENANCE', created_at: new Date().toISOString() }
  ];

  return <MachineClient initialData={initialData} />;
}
