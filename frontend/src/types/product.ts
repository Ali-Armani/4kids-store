export type ProductCategory =
  | 'cartoon-doll'
  | 'silicone-doll'
  | 'surprise-doll'
  | 'piano-doll'
  | 'plush-doll'
  | 'hair-accessory'
  | 'keychain'
  | 'leather-bag'
  | 'pipe-lighter'
  | 'vape'
  | 'earplug';

export type PlaceholderHue = 'rose' | 'plum' | 'gold' | 'sky' | 'sage';

export interface ProductVariant {
  id: string;
  sizeCm?: number;
  colorId?: string;
  price: number;
  compareAtPrice?: number;
  inStock: boolean;
  isDefault: boolean;
}

export interface ProductColor {
  id: string;
  /** Safe lookup key (e.g. "red"). Never inject into CSS directly. */
  key: string;
  label: string;
  sortOrder: number;
}

export interface ProductImage {
  id: string;
  colorId?: string;
  url: string;
  alt: string;
  sortOrder: number;
}

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
  categoryRank?: number;
  createdAt: string;
  variants: ProductVariant[];
  colors: ProductColor[];
  images: ProductImage[];
}

export const CATEGORY_LABELS: Record<ProductCategory, string> = {
  'cartoon-doll': 'عروسک شخصیت کارتونی',
  'silicone-doll': 'عروسک سیلیکونی',
  'surprise-doll': 'عروسک سورپرایزی',
  'piano-doll': 'عروسک پیانویی',
  'plush-doll': 'عروسک پولیشی',
  'hair-accessory': 'اکسسوری مو',
  'keychain': 'جاکلیدی مردانه و فانتزی',
  'leather-bag': 'کیف چرم مردانه و جاکارتی',
  'pipe-lighter': 'پیپ و فندک',
  'vape': 'پاد و ویپ و سالت و جویس',
  'earplug': 'گوش گیر فانتزی زنانه و دخترانه',
};