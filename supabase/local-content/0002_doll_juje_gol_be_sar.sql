
/* 
  add new product 'juje gol be sar'. (without image url)
*/

insert into products (
  slug,
  name,
  category,
  price,
  short_description,
  description,
  age_range,
  hue,
  featured,
  in_stock,
  image_url
) values (
  'juje-gol-be-sar',
  'جوجه گل به سر',
  'plush-doll',
  1050000,
  'عروسک پولیشی جوجه با گل روی سر',
  'عروسک پولیشی با متریال باکیفیت، اورجینال، ضدحساسیت و قابل شستشو، مناسب هدیه دادن!',
  'بالای ۳ سال',
  'gold',
  true,
  true,
  null
)

/*
  add image url of the product
*/

update products
set image_url = 'https://rbvgpfyurjhtupwhlnox.supabase.co/storage/v1/object/public/product-images/flower-head-fowl-doll.webp'
where slug = 'juje-gol-be-sar';