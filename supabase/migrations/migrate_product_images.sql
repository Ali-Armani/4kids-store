insert into public.product_images
  (product_id, color_id, storage_path, alt_text, sort_order)
select
  p.id,
  null,
  substring(p.image_url from '/object/public/product-images/([^?]+)'),
  left(p.name, 150),
  0
from public.products p
where p.image_url is not null
  and substring(p.image_url from '/object/public/product-images/([^?]+)')
        ~ '^[a-z0-9][a-z0-9_/-]*\.webp$'
  and char_length(substring(p.image_url from '/object/public/product-images/([^?]+)')) <= 200
  and not exists (
    select 1 from public.product_images i
    where i.product_id = p.id and i.color_id is null and i.sort_order = 0
  );