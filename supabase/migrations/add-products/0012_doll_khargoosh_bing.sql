
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
  'khargoosh-bing-doll',
  'عروسک بینگ خرگوشه',
  'cartoon-doll',
  350000,
  'نوستالژیک و تو دل برو',
  'عروسک خرگوش بینگ، همان شخصیت محبوب و بامزه کارتونی که حالا به شکل پولیشی نرم و دوست‌داشتنی آمده تا دل خاص‌پسندها را ببرد. بدن مشکی زیبایش در کنار لباس رنگی قرمز، سبز، زرد و سفید، ظاهری یونیک و چشم‌نواز به او بخشیده که در کمتر عروسکی پیدا می‌شود. این عروسک اورجینال وارداتی با جنس پولیش مرغوب، کاملاً ضدحساسیت و قابل شستشو است تا با خیال راحت همراه همیشگی عزیز شما باشد. ظاهر فوق‌العاده بامزه و منحصربه‌فردش، انتخابی ایده‌آل برای کسانی است که به دنبال محصولی خاص و متفاوت می‌گردند. یک همراه کارتونی واقعی که هم شادی می‌آورد و هم حس نوستالژی دلنشینی ایجاد می‌کند.',
  'بالای ۳ سال',
  'sky',
  false,
  true,
  'https://rbvgpfyurjhtupwhlnox.supabase.co/storage/v1/object/public/product-images/bing-bunny-doll.webp'
)