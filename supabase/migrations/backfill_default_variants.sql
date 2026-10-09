insert into public.product_variants
  (product_id, price, compare_at_price, stock, is_default)
select
  p.id,
  p.price,
  case when p.compare_at_price > p.price then p.compare_at_price else null end,
  case when p.in_stock then 10 else 0 end,
  true
from public.products p
where not exists (
  select 1 from public.product_variants v where v.product_id = p.id
);