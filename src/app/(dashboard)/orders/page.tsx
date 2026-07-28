import { createClient } from '@/utils/supabase/server';
import OrderClient from './OrderClient';

export default async function OrdersPage() {
  const supabase = createClient();
  
  const [
    { data: orders, error: ordersError },
    { data: customers, error: customersError }
  ] = await Promise.all([
    supabase.from('orders').select('*, customers(company_name)').order('created_at', { ascending: false }),
    supabase.from('customers').select('id, company_name').order('company_name', { ascending: true })
  ]);

  if (ordersError || customersError) {
    return <div className="p-8 text-error text-center">Failed to load orders: {ordersError?.message || customersError?.message}</div>;
  }

  return <OrderClient initialData={orders || []} customers={customers || []} />;
}
