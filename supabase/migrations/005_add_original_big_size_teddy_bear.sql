
/* 
  add new product 'original-big-teddy-bear'.
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
  'original-big-teddy-bear-doll',
  'عروسک خرس اورجینال سایز بزرگ',
  'plush-doll',
  7500000,
  'عروسک باکیفیت وارداتی',
  'عروسک خرس سایز بزرگ اورجینال، یکی از محبوب‌ترین و خاص‌ترین انتخاب‌ها برای عاشقان عروسک‌های پولیشی است. با اندازه چشمگیر و بافت فوق‌العاده نرم و لطیف، این خرس دوست‌داشتنی حس گرما و آرامش را به هر فضایی می‌آورد. کیفیت اورجینال و وارداتی آن باعث شده هم ظاهر زیبایی داشته باشد و هم دوام بالایی داشته باشد. چه برای هدیه دادن به عزیزانتان و چه برای چیدمان اتاق کودک یا اتاق نشیمن، این عروسک خرس بزرگ انتخابی بی‌نقص است. با یک نگاه عاشقش می‌شوید و با یک بغل، دلتان را تسخیر می‌کند.',
  'بالای ۶ سال',
  'plum',
  false,
  true,
  'https://rbvgpfyurjhtupwhlnox.supabase.co/storage/v1/object/public/product-images/original-big-teddy-bear-doll.webp'
)