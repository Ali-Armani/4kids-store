import type { Product, ProductCategory } from '../types/product';

/** دسته‌هایی که فقط اطلاع‌رسانی‌اند و نباید به سبد خرید بروند */
export const INFO_ONLY_CATEGORIES: ProductCategory[] = ['pipe-lighter', 'vape'];

export function isInfoOnlyCategory(category: ProductCategory): boolean {
  return INFO_ONLY_CATEGORIES.includes(category);
}

/** فقط محصولی که موجود است و در دسته‌ی اطلاع‌رسانی نیست قابل خرید است */
export function isPurchasable(product: Pick<Product, 'category' | 'inStock'>): boolean {
  return product.inStock && !isInfoOnlyCategory(product.category);
}