import type { Product } from '../types/product';

export const products: Product[] = [
  {
    id: 'p01',
    slug: 'arousak-parchei-leyli',
    name: 'عروسک پارچه‌ای لیلی',
    category: 'doll',
    price: 420000,
    shortDescription: 'عروسک پارچه‌ای نرم با لباس گلدار، مناسب هدیه و بازی روزمره.',
    description:
      'عروسک پارچه‌ای لیلی از پارچه‌ی نخی نرم و ضدحساسیت دوخته شده و برای بغل‌کردن و بازی روزانه‌ی کودکان طراحی شده. لباس گلدار آن قابل تعویض نیست اما رنگ‌ها پس از شست‌وشو ثابت می‌مانند.',
    ageRange: '۳ تا ۸ سال',
    hue: 'rose',
    featured: true,
    inStock: true,
  },
  {
    id: 'p02',
    slug: 'arousak-baleren-eylin',
    name: 'عروسک بالرین آیلین',
    category: 'doll',
    price: 480000,
    compareAtPrice: 560000,
    shortDescription: 'عروسک بالرین با دامن توری و قابلیت ایستادن روی پایه.',
    description:
      'آیلین یک عروسک بالرین با دامن توری چندلایه است که روی یک پایه‌ی چوبی کوچک می‌ایستد. مفاصل بازو و پا محدود و ایمن برای سنین پایین طراحی شده‌اند.',
    ageRange: '۴ تا ۹ سال',
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