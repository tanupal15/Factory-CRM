import { createClient } from "@/utils/supabase/server";
import ProjectClient from "./ProjectClient";

export const revalidate = 0;

export default async function ProjectsPage() {
  const supabase = createClient();
  const { data: projects } = await supabase.from("projects").select("*").order("created_at", { ascending: false });

  const initialData = (projects && projects.length > 0) ? projects : [
    { id: 'pj1', name: 'Assembly Line 3 Robotics Integration', description: 'Deploying 6-axis robotic arms for automated chassis welding.', status: 'ACTIVE', start_date: '2026-06-01', end_date: '2026-08-30' },
    { id: 'pj2', name: 'Solar Array & Energy Monitoring', description: 'Installing 500kW rooftop photovoltaic solar panels and OEE energy sensors.', status: 'PLANNING', start_date: '2026-09-15', end_date: '2026-11-01' },
    { id: 'pj3', name: 'Hydraulic Press PLC Retrofit', description: 'Upgrading legacy hydraulic press control boards to high-speed digital controllers.', status: 'COMPLETED', start_date: '2026-04-10', end_date: '2026-05-20' }
  ];

  return <ProjectClient initialData={initialData} />;
}
