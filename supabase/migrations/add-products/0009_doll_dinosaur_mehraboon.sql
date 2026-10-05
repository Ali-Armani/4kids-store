
/* 
  add new product 'dinosaur-mehraboon-doll'.
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
  'dinosaur-mehraboon-doll',
  'عروسک دایناسور مهربون',
  'plush-doll',
  3500000,
  'عروسک دایناسور مهربون 38 سانتی',
  'عروسک دایناسور مهربون سبز، با قد ۳۸ سانتی‌متری، یکی از جذاب‌ترین و دوست‌داشتنی‌ترین عروسک‌های پولیشی فروشگاه ماست. این دایناسور بانمک، یک قلب آبی بامزه را محکم بغل کرده و با ظاهر شیرین و دلربایش، حس محبت و مهربانی را منتقل می‌کند. رنگ سبز شاد و زنده آن، همراه با جزئیات جذاب طراحی، نگاه‌ها را به خودش جلب می‌کند. جنس پولیش نرم و باکیفیتش کاملاً ضدحساسیت و قابل شستشو است تا با خیال راحت بتوانید از آن مراقبت کنید. انتخابی عالی برای هدیه دادن به کودکان یا اضافه کردن حال‌وهوای دوست‌داشتنی به اتاق بازی.',
  'بالای ۳ سال',
  'plum',
  true,
  true,
  'https://rbvgpfyurjhtupwhlnox.supabase.co/storage/v1/object/public/product-images/kind-dinosaur-doll.webp'
)