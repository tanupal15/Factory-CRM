const fs = require('fs');
const path = require('path');

const modules = [
  { name: 'Departments', table: 'departments', icon: 'domain' },
  { name: 'Products', table: 'inventory', icon: 'category' },
  { name: 'Suppliers', table: 'suppliers', icon: 'local_shipping' },
  { name: 'PurchaseOrders', route: 'purchase-orders', table: 'orders', icon: 'receipt' },
  { name: 'Sales', table: 'orders', icon: 'point_of_sale' },
  { name: 'Invoices', table: 'orders', icon: 'request_quote' },
  { name: 'Quotations', table: 'orders', icon: 'description' },
  { name: 'Tasks', table: 'projects', icon: 'task' },
  { name: 'Attendance', table: 'workers', icon: 'how_to_reg' },
  { name: 'Expenses', table: 'orders', icon: 'payments' },
  { name: 'Reports', table: 'machines', icon: 'summarize' },
  { name: 'Notifications', table: 'machines', icon: 'notifications' },
  { name: 'ActivityLogs', route: 'activity-logs', table: 'machines', icon: 'history' },
  { name: 'Settings', table: 'profiles', icon: 'settings' },
  { name: 'UserManagement', route: 'user-management', table: 'profiles', icon: 'manage_accounts' },
  { name: 'RoleManagement', route: 'role-management', table: 'profiles', icon: 'admin_panel_settings' },
  { name: 'Profile', table: 'profiles', icon: 'person' },
];

const template = (name, table, icon) => `import { createClient } from '@/utils/supabase/server';

export default async function ${name}Page() {
  const supabase = createClient();
  const { data, error } = await supabase.from('${table}').select('*').limit(50);

  return (
    <div className="max-w-[1600px] mx-auto">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="font-headline-lg text-headline-lg mb-2">${name.replace(/([A-Z])/g, ' $1').trim()}</h1>
          <p className="text-on-surface-variant font-body-md">Manage ${name.toLowerCase()}</p>
        </div>
        <button className="bg-primary text-on-primary px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:brightness-110">
          <span className="material-symbols-outlined">${icon}</span>
          Add New
        </button>
      </div>

      <div className="bg-surface-container rounded-lg border border-outline-variant shadow-sm overflow-hidden">
        {error ? (
          <div className="p-8 text-error text-center">Failed to load data: {error.message}</div>
        ) : (
          <div className="p-8 text-center text-on-surface-variant">
            <span className="material-symbols-outlined text-4xl block mb-2">${icon}</span>
            {data && data.length > 0 ? \`Found \${data.length} records.\` : 'No records found.'}
            <p className="mt-4 text-sm opacity-70">Module initialized and connected to Supabase \`${table}\` table.</p>
          </div>
        )}
      </div>
    </div>
  );
}
`;

modules.forEach(mod => {
  const routeName = mod.route || mod.name.toLowerCase();
  const dirPath = path.join(__dirname, 'src', 'app', '(dashboard)', routeName);
  
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
  
  fs.writeFileSync(path.join(dirPath, 'page.tsx'), template(mod.name, mod.table, mod.icon));
  console.log(`Created page for ${mod.name} at /${routeName}`);
});
