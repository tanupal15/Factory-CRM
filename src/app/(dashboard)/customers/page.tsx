import { createClient } from '@/utils/supabase/server';
import CustomerClient from './CustomerClient';

export default async function CustomersPage() {
  const supabase = createClient();
  const { data: customers, error } = await supabase
    .from('customers')
    .select('*')
    .order('company_name', { ascending: true });

  if (error) {
    return <div className="p-8 text-error text-center">Failed to load customers: {error.message}</div>;
  }

  return <CustomerClient initialData={customers || []} />;
}
