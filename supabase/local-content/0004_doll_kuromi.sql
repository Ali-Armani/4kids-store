/* 
  add new product 'kuromi-doll'. (without image url)
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
  'kuromi-doll',
  'عروسک کرومی',
  'cartoon-doll',
  950000,
  'عروسک شخصیت کارتونی کرومی',
  'عروسک پولیشی نرم،  دخترونه و دوست داشتنی',
  'بالای ۳ سال',
  'gold',
  true,
  true,
  'https://rbvgpfyurjhtupwhlnox.supabase.co/storage/v1/object/public/product-images/kuromi-doll.webp'
)