import type { Product } from '../types/product';

export const products: Product[] = [
  {
    id: 'p01',
    slug: 'arousak-pianoyi',
    name: 'عروسک پیانویی',
    category: 'doll',
    price: 2500000,
    shortDescription: 'عروسک موزیکال، تولید صدای پیانو با ضربه روی دست',
    description:
      'دو نفر هر کدام یکی از قسمت‌های مخصوص عروسک را در دست می‌گیرند. با برقراری تماس، عروسک آماده پخش صدا می‌شود. سپس با لمس یا ضربه روی دست فرد مقابل، صداهای مختلف ایجاد می‌شود و می‌توان مانند یک بازی ریتمیک با آن تعامل کرد. جنس بدنه: پارچه و الیاف نرم و مناسب در آغوش گرفتن. کاربرد: سرگرمی، بازی تعاملی، بازی والد و کودک و فعالیت‌های حسی. طراحی: سبک، نرم و قابل حمل. دارای چهار موزیک جداگانه. سه عدد باتری نیم‌قلمی، همراه عروسک اشانتیون داده می شود.',
    ageRange: 'بالای ۶ سال',
    hue: 'rose',
    featured: true,
    inStock: true,
  },
  {
    id: 'p02',
    slug: 'arousak-gav-davande',
    name: 'عروسک گاو دونده',
    category: 'doll',
    price: 3850000,
    shortDescription: 'شبیه‌سازی حرکت دویدن گاو با تکان دادن سریع عروسک',
    description:
      'عروسک گاو دونده را در دست بگیرید و آن را با حرکات سریع و متناوب تکان دهید. با حرکت عروسک، پاهای آن نیز به‌صورت هماهنگ حرکت کرده و حرکت دویدن گاو را تقلید می‌کنند. برای عملکرد بهتر، حرکات سریع و پیوسته انجام دهید. کاربرد: سرگرمی کودکان، بازی تعاملی و آشنایی با حرکت و هماهنگی دست و چشم. طراحی: بامزه، فانتزی و مناسب برای بازی و هدیه. طراحی: بامزه، فانتزی و مناسب برای بازی و هدیه',
    ageRange: 'بالای ۳ سال',
    hue: 'plum',
    featured: true,
    inStock: true,
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((product) => product.featured);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return products
    .filter((item) => item.category === product.category && item.id !== product.id)
    .slice(0, limit);
}