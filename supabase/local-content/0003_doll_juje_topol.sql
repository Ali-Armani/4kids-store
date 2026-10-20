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
  'juje-topol-fat-fowl',
  'جوجه تپل',
  'plush-doll',
  1050000,
  'عروسک پولیشی جوجه تپل',
  'عروسک پولیشی نرم و ناز، بامزه و دوست داشتنی',
  'بالای ۳ سال',
  'gold',
  false,
  true,
  'https://rbvgpfyurjhtupwhlnox.supabase.co/storage/v1/object/public/product-images/juje-topol-fat-fowl-doll.webp'
)