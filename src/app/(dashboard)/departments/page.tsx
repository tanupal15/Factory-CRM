import { createClient } from "@/utils/supabase/server";
import DepartmentClient from "./DepartmentClient";

export const revalidate = 0;

export default async function DepartmentsPage() {
  const supabase = createClient();
  const { data: departments } = await supabase.from("departments").select("*").order("created_at", { ascending: false });

  const initialData = (departments && departments.length > 0) ? departments : [
    { id: 'dp1', name: 'Precision Machining & Milling', description: 'CNC Lathes, Milling cutters, and high precision metal fabrication.' },
    { id: 'dp2', name: 'Hydraulic Press & Stamping', description: 'Heavy tonnage presses and metal sheet shaping operations.' },
    { id: 'dp3', name: 'Robotic Assembly & Quality Inspection', description: 'Automated 6-axis welding and laser quality control scanners.' },
    { id: 'dp4', name: 'Procurement & Logistics', description: 'Inventory raw materials intake, storage, and vendor coordination.' }
  ];

  return <DepartmentClient initialData={initialData} />;
}
