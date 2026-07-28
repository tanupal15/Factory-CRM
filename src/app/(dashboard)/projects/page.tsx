import { createClient } from '@/utils/supabase/server';

export default async function ProjectsPage() {
  const supabase = createClient();
  const { data: projects, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div className="max-w-[1600px] mx-auto">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="font-headline-lg text-headline-lg mb-2">Projects</h1>
          <p className="text-on-surface-variant font-body-md">Manage ongoing factory projects</p>
        </div>
        <button className="bg-primary text-on-primary px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:brightness-110">
          <span className="material-symbols-outlined">add_task</span>
          New Project
        </button>
      </div>

      <div className="bg-surface-container rounded-lg border border-outline-variant shadow-sm overflow-hidden">
        {error ? (
          <div className="p-8 text-error text-center">Failed to load projects: {error.message}</div>
        ) : (
          <table className="w-full text-left">
            <thead className="bg-surface-container-high border-b border-outline-variant">
              <tr>
                <th className="px-6 py-4 font-label-xs text-on-surface-variant uppercase tracking-wider">Project Name</th>
                <th className="px-6 py-4 font-label-xs text-on-surface-variant uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 font-label-xs text-on-surface-variant uppercase tracking-wider">Timeline</th>
                <th className="px-6 py-4 font-label-xs text-on-surface-variant uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant">
              {projects && projects.length > 0 ? (
                projects.map((project) => (
                  <tr key={project.id} className="hover:bg-surface-container-highest transition-colors">
                    <td className="px-6 py-4 font-medium">{project.name}</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 rounded-full text-xs font-bold bg-secondary-container/20 text-secondary">
                        {project.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-on-surface-variant text-sm">
                      {project.start_date || 'TBD'} - {project.end_date || 'TBD'}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-primary hover:underline font-label-sm">Manage</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-on-surface-variant">
                    No active projects.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
