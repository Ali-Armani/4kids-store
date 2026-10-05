
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
  'khargoosh-holoo-be-dast-doll',
  'عروسک خرگوش هلو به دست',
  'plush-doll',
  2750000,
  'در دو سایز 32سانتی و 20سانتی',
  'عروسک خرگوش سفید با هلوی بامزه، انگار مستقیم از یک قصه شیرین بیرون آمده و آمده تا دل همه را ببرد! گوش‌های نسبتاً بزرگ و بازیگوشش همیشه آماده‌اند تا کوچک‌ترین نجواها را بشنوند و هویج نارنجی روشن و بامزه‌اش را محکم در دست گرفته، انگار که گنج کوچکی را نگه داشته باشد. ظاهر فوق‌العاده کیوت و دوست‌داشتنی این خرگوش، هر کسی را در نگاه اول مجذوب خودش می‌کند و حس لطافت و شادی را القا می‌کند. جنس پولیش نرم و مرغوبش کاملاً ضدحساسیت و قابل شستشو است و کیفیت اورجینال وارداتی‌اش، دوام و زیبایی‌اش را برای مدت‌ها تضمین می‌کند. یک همراه نازنین و همیشگی برای کودکان و حتی بزرگترهایی که هنوز کودک درونیشان فعال است.',
  'بالای ۳ سال',
  'plum',
  true,
  true,
  'https://rbvgpfyurjhtupwhlnox.supabase.co/storage/v1/object/public/product-images/bunny-holding-a-peach-doll.webp'
)