import { createClient } from '@/utils/supabase/server';
import WorkerClient from './WorkerClient';

export default async function WorkersPage() {
  const supabase = createClient();
  const { data: workers, error } = await supabase
    .from('workers')
    .select('*')
    .order('last_name', { ascending: true });

  if (error) {
    return <div className="p-8 text-error text-center">Failed to load workers: {error.message}</div>;
  }

  return <WorkerClient initialData={workers || []} />;
}
