begin;

create table public.product_colors (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  color_key text not null check (color_key ~ '^[a-z][a-z-]{1,19}$'),
  label text not null check (char_length(label) between 1 and 30),
  sort_order integer not null default 0 check (sort_order between 0 and 99),
  created_at timestamptz not null default now(),
  constraint product_colors_unique_key unique (product_id, color_key),
  constraint product_colors_id_product_unique unique (id, product_id)
);

alter table public.product_variants
  drop constraint product_variants_unique_combo;

alter table public.product_variants
  drop column color_key,
  drop column color_label;

alter table public.product_variants
  add column color_id uuid;

alter table public.product_variants
  add constraint product_variants_color_fk
  foreign key (color_id, product_id)
  references public.product_colors (id, product_id);

alter table public.product_variants
  add constraint product_variants_unique_combo
  unique nulls not distinct (product_id, size_cm, color_id);

create table public.product_images (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  color_id uuid,
  storage_path text not null
    check (char_length(storage_path) <= 200
           and storage_path ~ '^[a-z0-9][a-z0-9_/-]*\.webp$'),
  alt_text text check (alt_text is null or char_length(alt_text) <= 150),
  sort_order integer not null default 0 check (sort_order between 0 and 2),
  created_at timestamptz not null default now(),
  constraint product_images_color_fk
    foreign key (color_id, product_id)
    references public.product_colors (id, product_id),
  constraint product_images_max_three
    unique nulls not distinct (product_id, color_id, sort_order)
);

create index product_colors_product_id_idx on public.product_colors (product_id);
create index product_images_product_id_idx on public.product_images (product_id);

alter table public.product_colors enable row level security;
alter table public.product_images enable row level security;

create policy "Public can read colors"
  on public.product_colors for select to anon, authenticated using (true);
create policy "Public can read images"
  on public.product_images for select to anon, authenticated using (true);

revoke all on public.product_colors from anon, authenticated;
revoke all on public.product_images from anon, authenticated;

grant select on public.product_colors to anon, authenticated;
grant select on public.product_images to anon, authenticated;
grant select (color_id) on public.product_variants to anon, authenticated;

commit;