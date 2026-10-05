-- Orders and order items for guest checkout.
-- Writes happen only through Edge Functions using the service role.

create table public.orders (
  id uuid primary key default gen_random_uuid(),
  public_token uuid not null unique default gen_random_uuid(),
  status text not null default 'pending'
    constraint orders_status_check
    check (status in ('pending','paid','failed','cancelled','shipped','delivered')),
  customer_name text not null check (char_length(customer_name) between 2 and 100),
  customer_phone text not null check (char_length(customer_phone) between 10 and 15),
  province text not null,
  city text not null,
  address text not null check (char_length(address) between 10 and 500),
  postal_code text check (postal_code is null or char_length(postal_code) = 10),
  total_amount integer not null check (total_amount > 0),
  payment_authority text unique,
  payment_ref_id text,
  paid_at timestamptz,
  created_at timestamptz not null default now()
);

create index orders_created_at_idx on public.orders (created_at desc);

-- Name and price are copied at purchase time (snapshot).
create table public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id uuid references public.products(id) on delete set null,
  product_name text not null,
  unit_price integer not null check (unit_price > 0),
  quantity integer not null check (quantity between 1 and 20),
  created_at timestamptz not null default now()
);

create index order_items_order_id_idx on public.order_items (order_id);

-- RLS on with no policies: anon and authenticated cannot access these tables.
alter table public.orders enable row level security;
alter table public.order_items enable row level security;

-- Second layer: remove table privileges from public-facing roles.
revoke all on public.orders from anon, authenticated;
revoke all on public.order_items from anon, authenticated;
