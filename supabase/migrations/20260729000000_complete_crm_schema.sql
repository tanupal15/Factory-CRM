-- Additional tables for complete Factory CRM application

-- PRODUCTS
create table if not exists public.products (
  id uuid default uuid_generate_v4() primary key,
  sku text unique not null,
  name text not null,
  category text,
  unit_price numeric default 0 not null,
  stock_quantity integer default 0 not null,
  description text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- QUOTATIONS
create table if not exists public.quotations (
  id uuid default uuid_generate_v4() primary key,
  quotation_number text unique not null,
  customer_id uuid references public.customers(id) on delete cascade,
  total_amount numeric default 0 not null,
  status text default 'DRAFT' check (status in ('DRAFT', 'SENT', 'ACCEPTED', 'REJECTED')),
  valid_until date,
  notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- INVOICES
create table if not exists public.invoices (
  id uuid default uuid_generate_v4() primary key,
  invoice_number text unique not null,
  order_id uuid references public.orders(id) on delete set null,
  customer_id uuid references public.customers(id) on delete cascade,
  amount_due numeric default 0 not null,
  amount_paid numeric default 0 not null,
  status text default 'UNPAID' check (status in ('UNPAID', 'PARTIAL', 'PAID', 'OVERDUE')),
  due_date date,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- PURCHASE ORDERS
create table if not exists public.purchase_orders (
  id uuid default uuid_generate_v4() primary key,
  po_number text unique not null,
  supplier_id uuid references public.suppliers(id) on delete set null,
  total_amount numeric default 0 not null,
  status text default 'DRAFT' check (status in ('DRAFT', 'ISSUED', 'RECEIVED', 'CANCELLED')),
  expected_delivery date,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- EXPENSES
create table if not exists public.expenses (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  category text default 'OPERATIONAL',
  amount numeric default 0 not null,
  expense_date date default CURRENT_DATE not null,
  description text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ATTENDANCE
create table if not exists public.attendance (
  id uuid default uuid_generate_v4() primary key,
  worker_id uuid references public.workers(id) on delete cascade not null,
  work_date date default CURRENT_DATE not null,
  status text default 'PRESENT' check (status in ('PRESENT', 'ABSENT', 'LATE', 'ON_LEAVE')),
  check_in text,
  check_out text,
  notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- TASKS
create table if not exists public.tasks (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text,
  assigned_to uuid references public.workers(id) on delete set null,
  status text default 'TODO' check (status in ('TODO', 'IN_PROGRESS', 'REVIEW', 'COMPLETED')),
  priority text default 'MEDIUM' check (priority in ('LOW', 'MEDIUM', 'HIGH', 'URGENT')),
  due_date date,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ACTIVITY LOGS
create table if not exists public.activity_logs (
  id uuid default uuid_generate_v4() primary key,
  action text not null,
  entity_type text,
  entity_id text,
  details text,
  user_email text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- NOTIFICATIONS
create table if not exists public.notifications (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  message text not null,
  type text default 'INFO' check (type in ('INFO', 'WARNING', 'ALERT', 'SUCCESS')),
  is_read boolean default false not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- AI INSIGHTS
create table if not exists public.ai_insights (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  type text default 'MAINTENANCE',
  insight_text text not null,
  confidence_score numeric default 0.95,
  action_recommended text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- REPORTS
create table if not exists public.reports (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  report_type text not null,
  summary text,
  status text default 'COMPLETED',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS Enablement
alter table public.products enable row level security;
alter table public.quotations enable row level security;
alter table public.invoices enable row level security;
alter table public.purchase_orders enable row level security;
alter table public.expenses enable row level security;
alter table public.attendance enable row level security;
alter table public.tasks enable row level security;
alter table public.activity_logs enable row level security;
alter table public.notifications enable row level security;
alter table public.ai_insights enable row level security;
alter table public.reports enable row level security;

-- Setup initial RLS policies
create policy "Full access for authenticated" on public.products for all to authenticated using (true);
create policy "Full access for authenticated" on public.quotations for all to authenticated using (true);
create policy "Full access for authenticated" on public.invoices for all to authenticated using (true);
create policy "Full access for authenticated" on public.purchase_orders for all to authenticated using (true);
create policy "Full access for authenticated" on public.expenses for all to authenticated using (true);
create policy "Full access for authenticated" on public.attendance for all to authenticated using (true);
create policy "Full access for authenticated" on public.tasks for all to authenticated using (true);
create policy "Full access for authenticated" on public.activity_logs for all to authenticated using (true);
create policy "Full access for authenticated" on public.notifications for all to authenticated using (true);
create policy "Full access for authenticated" on public.ai_insights for all to authenticated using (true);
create policy "Full access for authenticated" on public.reports for all to authenticated using (true);
