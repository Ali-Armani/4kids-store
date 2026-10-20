
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
  'gorbeh-mehraboon-papiyon-be-sar-doll',
  'عروسک گربه مهربون با پاپیون روی سر',
  'plush-doll',
  1000000,
  'در دو رنگ مشکی-سفید و خاکستری-سفید',
  'عروسک گربه مهربون با پاپیون به سر، یکی از شیرین‌ترین و دلبرترین عروسک‌های پولیشی فروشگاه ماست. این گربه بانمک با ظاهر دوست‌داشتنی و پاپیون زیبایش، حس لطافت و محبت را به هر فضایی می‌آورد. جنس پولیش نرم و باکیفیت آن کاملاً ضدحساسیت و قابل شستشو است و کیفیت اورجینال و وارداتی‌اش دوام بالایی به آن بخشیده. در دو رنگ جذاب مشکی-سفید و خاکستری-سفید موجود است تا بتوانید رنگ مورد علاقه‌تان را انتخاب کنید. انتخابی عالی برای هدیه دادن یا اضافه کردن یک همراه نازنین به اتاق کودک.',        
  'بالای ۳ سال',
  'sky',
  true,
  true,
  'https://rbvgpfyurjhtupwhlnox.supabase.co/storage/v1/object/public/product-images/kind-cat-bow-tie-on-head-doll.webp'
)