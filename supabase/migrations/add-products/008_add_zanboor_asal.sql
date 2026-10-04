
/* 
  add new product 'zanboor-asal-doll'.
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
  'zanboor-asal-doll',
  'عروسک زنبور عسل',
  'plush-doll',
  2200000,
  'عروسک زنبورعسل 25 سانتی',
  'عروسک زنبور عسل نرم و بانمک، با قد ۲۵ سانتی‌متری، یکی از دلبرترین عروسک‌های پولیشی فروشگاه ماست. ظاهر بامزه و رنگ‌های شادش، حس شادی و انرژی مثبت را به هر فضایی می‌آورد و برای دخترای نازنین حسابی جذاب است. جنس پولیش بسیار نرم و باکیفیت آن، کاملاً ضدحساسیت و قابل شستشو است تا با خیال راحت بتوانید از آن مراقبت کنید. کیفیت اورجینال و مرغوب این عروسک، دوام بالایی به آن بخشیده و آن را به همراهی دوست‌داشتنی برای سال‌ها تبدیل کرده است. انتخابی عالی برای هدیه دادن یا اضافه کردن یک تکه شیرینی به اتاق کودک.',
  'بالای ۳ سال',
  'plum',
  false,
  true,
  'https://rbvgpfyurjhtupwhlnox.supabase.co/storage/v1/object/public/product-images/honey-bee-doll.webp'
)