import { createClient } from '@/utils/supabase/server';

export default async function SalesPage() {
  const supabase = createClient();
  const { data, error } = await supabase.from('orders').select('*').limit(50);

  return (
    <div className="max-w-[1600px] mx-auto">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="font-headline-lg text-headline-lg mb-2">Sales</h1>
          <p className="text-on-surface-variant font-body-md">Manage sales</p>
        </div>
        <button className="bg-primary text-on-primary px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:brightness-110">
          <span className="material-symbols-outlined">point_of_sale</span>
          Add New
        </button>
      </div>

      <div className="bg-surface-container rounded-lg border border-outline-variant shadow-sm overflow-hidden">
        {error ? (
          <div className="p-8 text-error text-center">Failed to load data: {error.message}</div>
        ) : (
          <div className="p-8 text-center text-on-surface-variant">
            <span className="material-symbols-outlined text-4xl block mb-2">point_of_sale</span>
            {data && data.length > 0 ? `Found ${data.length} records.` : 'No records found.'}
            <p className="mt-4 text-sm opacity-70">Module initialized and connected to Supabase `orders` table.</p>
          </div>
        )}
      </div>
    </div>
  );
}
