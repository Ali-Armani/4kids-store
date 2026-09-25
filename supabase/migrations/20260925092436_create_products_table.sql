-- Products table — matches the frontend's Product type (src/types/product.ts)
-- so no mapping is needed beyond snake_case -> camelCase field names.

create extension if not exists pgcrypto;

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  category text not null
    check (category in ('doll', 'hair-clip', 'headband', 'hair-tie', 'gift-set')),
  price integer not null check (price >= 0),
  compare_at_price integer check (compare_at_price is null or compare_at_price >= 0),
  short_description text not null,
  description text not null,
  age_range text not null,
  hue text not null
    check (hue in ('rose', 'plum', 'gold', 'sky', 'sage')),
  featured boolean not null default false,
  in_stock boolean not null default true,
  image_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.products is
  'Storefront products. price and compare_at_price are Toman, integers (no decimals).';

-- Keep updated_at current on every edit.
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists products_set_updated_at on public.products;
create trigger products_set_updated_at
  before update on public.products
  for each row
  execute function public.set_updated_at();

-- Row Level Security: the storefront is public, so anyone (including the
-- anon key used by the browser) may READ products. Nobody can write via
-- the anon key — inserts/updates/deletes are done from the Supabase
-- dashboard (Table Editor) for now, which uses a privileged connection
-- and bypasses RLS, so no write policy is needed yet. When an admin
-- panel is built later, a proper authenticated write policy belongs here.
alter table public.products enable row level security;

drop policy if exists "Public can read products" on public.products;
create policy "Public can read products"
  on public.products
  for select
  to anon, authenticated
  using (true);
