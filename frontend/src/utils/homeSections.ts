import type { Product, ProductCategory } from '../types/product';

/** دسته‌هایی که فعلاً در صفحه‌ی اصلی نمایش داده نمی‌شوند.
 *  برای برگرداندن یک دسته، فقط اسمش را از این لیست پاک کن. */
const HOME_HIDDEN_CATEGORIES: ProductCategory[] = ['pipe-lighter', 'vape'];

/** ترتیب نمایش دسته‌ها در صفحه‌ی اصلی */
const HOME_CATEGORY_ORDER: ProductCategory[] = [
  'cartoon-doll',
  'silicone-doll',
  'surprise-doll',
  'piano-doll',
  'plush-doll',
  'hair-accessory',
  'keychain',
  'leather-bag',
  'pipe-lighter',
  'vape',
  'earplug',
];

/** دسته‌های قابل‌نمایش در صفحه‌ی اصلی (ترتیب بالا منهای مخفی‌ها) */
export const HOME_VISIBLE_CATEGORIES = HOME_CATEGORY_ORDER.filter(
  (category) => !HOME_HIDDEN_CATEGORIES.includes(category)
);

/** حداکثر تعداد محصول نمایشی برای هر دسته (دسکتاپ) */
const HOME_MAX_PER_CATEGORY = 4;

/** اول categoryRank (عدد کمتر زودتر، خالی آخر)، بعد جدیدترین */
export function compareForHome(a: Product, b: Product): number {
  const rankA = a.categoryRank ?? Number.POSITIVE_INFINITY;
  const rankB = b.categoryRank ?? Number.POSITIVE_INFINITY;
  if (rankA !== rankB) return rankA - rankB;
  return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
}

export interface HomeSection {
  category: ProductCategory;
  /** محصولات نمایشی (حداکثر HOME_MAX_PER_CATEGORY) */
  products: Product[];
  /** تعداد کل محصولات این دسته */
  total: number;
}

export function buildHomeSections(products: Product[]): HomeSection[] {
  return HOME_VISIBLE_CATEGORIES.map((category) => {
    // filter یک کپی می‌سازد، پس sort آرایه‌ی اصلی context را دستکاری نمی‌کند
    const inCategory = products.filter((p) => p.category === category).sort(compareForHome);
    return {
      category,
      products: inCategory.slice(0, HOME_MAX_PER_CATEGORY),
      total: inCategory.length,
    };
  }).filter((section) => section.total > 0);
}