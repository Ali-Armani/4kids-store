export type ProductCategory =
  | 'doll'
  | 'hair-clip'
  | 'headband'
  | 'hair-tie'
  | 'gift-set';

export type PlaceholderHue = 'rose' | 'plum' | 'gold' | 'sky' | 'sage';

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  price: number;
  compareAtPrice?: number;
  shortDescription: string;
  description: string;
  ageRange: string;
  hue: PlaceholderHue;
  /** Real product photo URL. Left unset for now — falls back to placeholder art
   * until product photos are added through the future admin/backend. */
  imageUrl?: string;
  featured: boolean;
  inStock: boolean;
}

export const CATEGORY_LABELS: Record<ProductCategory, string> = {
  doll: 'عروسک',
  'hair-clip': 'گیره‌سر و پاپیون',
  headband: 'تل مو',
  'hair-tie': 'کش مو',
  'gift-set': 'ست هدیه',
};
