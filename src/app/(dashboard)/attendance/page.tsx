import { createClient } from "@/utils/supabase/server";
import AttendanceClient from "./AttendanceClient";

export const revalidate = 0;

export default async function AttendancePage() {
  const supabase = createClient();
  const [attRes, workersRes] = await Promise.all([
    supabase.from("attendance").select("*, workers(first_name, last_name)").order("work_date", { ascending: false }),
    supabase.from("workers").select("id, first_name, last_name, position"),
  ]);

  const initialData = (attRes.data && attRes.data.length > 0) ? attRes.data : [
    { id: 'at1', work_date: '2026-07-29', status: 'PRESENT', check_in: '07:55 AM', check_out: '05:05 PM', workers: { first_name: 'Marcus', last_name: 'Vance' } },
    { id: 'at2', work_date: '2026-07-29', status: 'LATE', check_in: '08:42 AM', check_out: '05:00 PM', notes: 'Traffic delay on Sector G Highway', workers: { first_name: 'Elena', last_name: 'Rostova' } },
    { id: 'at3', work_date: '2026-07-29', status: 'ON_LEAVE', check_in: '-', check_out: '-', notes: 'Scheduled annual PTO', workers: { first_name: 'David', last_name: 'Miller' } }
  ];

  const workers = (workersRes.data && workersRes.data.length > 0) ? workersRes.data : [
    { id: 'w1', first_name: 'Marcus', last_name: 'Vance', position: 'Lead CNC Operator' },
    { id: 'w2', first_name: 'Elena', last_name: 'Rostova', position: 'Quality Inspector' },
    { id: 'w3', first_name: 'David', last_name: 'Miller', position: 'Maintenance Engineer' }
  ];

  return <AttendanceClient initialData={initialData} workers={workers} />;
}
