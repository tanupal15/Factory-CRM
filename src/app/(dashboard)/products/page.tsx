import { createClient } from '@/utils/supabase/server';

export default async function ProductsPage() {
  const supabase = createClient();
  const { data: products, error } = await supabase.from('inventory').select('*').limit(12);

  return (
    <div className="max-w-[1600px] mx-auto">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="font-headline-lg text-headline-lg mb-2">Product Catalog</h1>
          <p className="text-on-surface-variant font-body-md">View and manage end-user products</p>
        </div>
        <button className="bg-primary text-on-primary px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:brightness-110">
          <span className="material-symbols-outlined">category</span>
          New Product
        </button>
      </div>

      {error && <div className="p-4 bg-error-container text-on-error-container rounded mb-8">{error.message}</div>}

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products && products.length > 0 ? (
          products.map(product => (
            <div key={product.id} className="bg-surface-container rounded-xl border border-outline-variant overflow-hidden hover:border-primary transition-colors cursor-pointer flex flex-col">
              <div className="h-40 bg-surface-container-high flex items-center justify-center">
                <span className="material-symbols-outlined text-6xl text-on-surface-variant/30">inventory_2</span>
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <h3 className="font-headline-sm font-bold truncate">{product.name}</h3>
                <p className="font-mono text-xs text-on-surface-variant mb-4">{product.sku}</p>
                <div className="mt-auto flex justify-between items-center">
                  <span className="font-bold text-secondary">${product.unit_price}</span>
                  <span className="text-sm bg-surface-container-highest px-2 py-1 rounded-md">{product.quantity} in stock</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full p-12 text-center border border-dashed border-outline-variant rounded-xl text-on-surface-variant">
            No products available.
          </div>
        )}
      </div>
    </div>
  );
}
