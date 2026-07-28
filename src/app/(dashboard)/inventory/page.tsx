import { createClient } from '@/utils/supabase/server';
import InventoryClient from './InventoryClient';

export default async function InventoryPage() {
  const supabase = createClient();
  const { data: inventory, error } = await supabase
    .from('inventory')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return <div className="p-8 text-error text-center">Failed to load inventory: {error.message}</div>;
  }

  return <InventoryClient initialData={inventory || []} />;
}
