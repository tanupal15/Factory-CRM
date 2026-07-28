-- Enable necessary extensions
create extension if not exists "uuid-ossp";

-- ROLES ENUM
create type user_role as enum ('SUPER_ADMIN', 'ADMIN', 'MANAGER', 'EMPLOYEE');

-- USERS (Profiles linked to auth.users)
create table public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  first_name text,
  last_name text,
  role user_role default 'EMPLOYEE'::user_role not null,
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  deleted_at timestamp with time zone
);

-- DEPARTMENTS
create table public.departments (
  id uuid default uuid_generate_v4() primary key,
  name text unique not null,
  description text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- WORKERS (Employees)
create table public.workers (
  id uuid default uuid_generate_v4() primary key,
  profile_id uuid references public.profiles(id) on delete set null,
  department_id uuid references public.departments(id) on delete set null,
  first_name text not null,
  last_name text not null,
  position text not null,
  email text,
  phone text,
  hire_date date,
  status text default 'ACTIVE' check (status in ('ACTIVE', 'INACTIVE', 'ON_LEAVE')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- MACHINES (Assets)
create table public.machines (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  machine_code text unique not null,
  status text default 'ACTIVE' check (status in ('ACTIVE', 'WARNING', 'CRITICAL', 'MAINTENANCE', 'OFFLINE')),
  sector text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  deleted_at timestamp with time zone
);

-- MACHINE TELEMETRY (For real-time dashboard)
create table public.machine_telemetry (
  id uuid default uuid_generate_v4() primary key,
  machine_id uuid references public.machines(id) on delete cascade not null,
  temperature numeric,
  vibration numeric,
  rpm numeric,
  recorded_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- SUPPLIERS
create table public.suppliers (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  contact_name text,
  email text,
  phone text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- INVENTORY
create table public.inventory (
  id uuid default uuid_generate_v4() primary key,
  sku text unique not null,
  name text not null,
  description text,
  quantity integer default 0 not null,
  unit_price numeric not null,
  category text,
  supplier_id uuid references public.suppliers(id) on delete set null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  deleted_at timestamp with time zone
);

-- CUSTOMERS
create table public.customers (
  id uuid default uuid_generate_v4() primary key,
  company_name text not null,
  contact_name text,
  email text,
  phone text,
  address text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  deleted_at timestamp with time zone
);

-- ORDERS
create table public.orders (
  id uuid default uuid_generate_v4() primary key,
  customer_id uuid references public.customers(id) on delete cascade not null,
  status text default 'PENDING' check (status in ('PENDING', 'PROCESSING', 'COMPLETED', 'CANCELLED')),
  total_amount numeric not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  deleted_at timestamp with time zone
);

-- PROJECTS
create table public.projects (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  description text,
  status text default 'PLANNING' check (status in ('PLANNING', 'ACTIVE', 'ON_HOLD', 'COMPLETED')),
  start_date date,
  end_date date,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS POLICIES
alter table public.profiles enable row level security;
alter table public.departments enable row level security;
alter table public.workers enable row level security;
alter table public.machines enable row level security;
alter table public.machine_telemetry enable row level security;
alter table public.suppliers enable row level security;
alter table public.inventory enable row level security;
alter table public.customers enable row level security;
alter table public.orders enable row level security;
alter table public.projects enable row level security;

-- Setup initial RLS
create policy "Viewable by authenticated users." on public.profiles for select to authenticated using (true);
create policy "Users can update own profile." on public.profiles for update using (auth.uid() = id);

create policy "All data viewable by authenticated" on public.departments for select to authenticated using (true);
create policy "All data viewable by authenticated" on public.workers for select to authenticated using (true);
create policy "All data viewable by authenticated" on public.machines for select to authenticated using (true);
create policy "All data viewable by authenticated" on public.machine_telemetry for select to authenticated using (true);
create policy "All data viewable by authenticated" on public.suppliers for select to authenticated using (true);
create policy "All data viewable by authenticated" on public.inventory for select to authenticated using (true);
create policy "All data viewable by authenticated" on public.customers for select to authenticated using (true);
create policy "All data viewable by authenticated" on public.orders for select to authenticated using (true);
create policy "All data viewable by authenticated" on public.projects for select to authenticated using (true);

-- Allow full access for now to simplify CRUD (Production requires granular RLS)
create policy "Full access for authenticated" on public.departments for all to authenticated using (true);
create policy "Full access for authenticated" on public.workers for all to authenticated using (true);
create policy "Full access for authenticated" on public.machines for all to authenticated using (true);
create policy "Full access for authenticated" on public.machine_telemetry for all to authenticated using (true);
create policy "Full access for authenticated" on public.suppliers for all to authenticated using (true);
create policy "Full access for authenticated" on public.inventory for all to authenticated using (true);
create policy "Full access for authenticated" on public.customers for all to authenticated using (true);
create policy "Full access for authenticated" on public.orders for all to authenticated using (true);
create policy "Full access for authenticated" on public.projects for all to authenticated using (true);

-- Functions and Triggers for updated_at
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

create trigger handle_profiles_updated_at before update on public.profiles for each row execute procedure public.handle_updated_at();
create trigger handle_workers_updated_at before update on public.workers for each row execute procedure public.handle_updated_at();
create trigger handle_machines_updated_at before update on public.machines for each row execute procedure public.handle_updated_at();
create trigger handle_suppliers_updated_at before update on public.suppliers for each row execute procedure public.handle_updated_at();
create trigger handle_inventory_updated_at before update on public.inventory for each row execute procedure public.handle_updated_at();
create trigger handle_customers_updated_at before update on public.customers for each row execute procedure public.handle_updated_at();
create trigger handle_orders_updated_at before update on public.orders for each row execute procedure public.handle_updated_at();
create trigger handle_projects_updated_at before update on public.projects for each row execute procedure public.handle_updated_at();
