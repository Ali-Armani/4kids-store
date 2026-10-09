create table public.product_variants (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  size_cm integer check (size_cm is null or size_cm between 1 and 500),
  color_key text check (color_key is null or color_key ~ '^[a-z][a-z-]{1,19}$'),
  color_label text check (color_label is null or char_length(color_label) between 1 and 30),
  price integer not null check (price > 0),
  compare_at_price integer check (compare_at_price is null or compare_at_price > price),
  stock integer not null default 0 check (stock >= 0),
  in_stock boolean generated always as (stock > 0) stored,
  is_default boolean not null default false,
  created_at timestamptz not null default now(),
  constraint product_variants_unique_combo
    unique nulls not distinct (product_id, size_cm, color_key)
);

create unique index product_variants_one_default
  on public.product_variants (product_id) where is_default;

create index product_variants_product_id_idx
  on public.product_variants (product_id);

alter table public.product_variants enable row level security;

create policy "Public can read variants"
  on public.product_variants
  for select
  to anon, authenticated
  using (true);

revoke all on public.product_variants from anon, authenticated;

grant select (id, product_id, size_cm, color_key, color_label,
              price, compare_at_price, in_stock, is_default)
  on public.product_variants to anon, authenticated;