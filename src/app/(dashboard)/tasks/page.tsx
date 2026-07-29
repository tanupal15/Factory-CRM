import { createClient } from "@/utils/supabase/server";
import TaskClient from "./TaskClient";

export const revalidate = 0;

export default async function TasksPage() {
  const supabase = createClient();
  const [tasksRes, workersRes] = await Promise.all([
    supabase.from("tasks").select("*, workers(first_name, last_name)").order("created_at", { ascending: false }),
    supabase.from("workers").select("id, first_name, last_name, position"),
  ]);

  const initialData = (tasksRes.data && tasksRes.data.length > 0) ? tasksRes.data : [
    { id: 't1', title: 'Calibrate Thermal Sensor on Lathe G7', description: 'Address 14% temperature variance anomaly.', priority: 'URGENT', status: 'IN_PROGRESS', due_date: '2026-07-30', workers: { first_name: 'David', last_name: 'Miller' } },
    { id: 't2', title: 'Routine Lubrication - Hydraulic Press G7', description: 'Quarterly fluid & filter replacement.', priority: 'MEDIUM', status: 'TODO', due_date: '2026-08-05', workers: { first_name: 'Marcus', last_name: 'Vance' } },
    { id: 't3', title: 'Safety Sensor Testing Line 2', description: 'Verify emergency E-stop interlocks.', priority: 'HIGH', status: 'COMPLETED', due_date: '2026-07-28', workers: { first_name: 'Elena', last_name: 'Rostova' } }
  ];

  const workers = (workersRes.data && workersRes.data.length > 0) ? workersRes.data : [
    { id: 'w1', first_name: 'Marcus', last_name: 'Vance', position: 'Lead CNC Operator' },
    { id: 'w2', first_name: 'Elena', last_name: 'Rostova', position: 'Quality Inspector' },
    { id: 'w3', first_name: 'David', last_name: 'Miller', position: 'Maintenance Engineer' }
  ];

  return <TaskClient initialData={initialData} workers={workers} />;
}
