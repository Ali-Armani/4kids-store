import { supabase } from '../lib/supabaseClient';
import type {
  Product,
  ProductColor,
  ProductImage,
  ProductVariant,
} from '../types/product';

interface VariantRow {
  id: string;
  product_id: string;
  size_cm: number | null;
  color_id: string | null;
  price: number;
  compare_at_price: number | null;
  in_stock: boolean;
  is_default: boolean;
}

interface ColorRow {
  id: string;
  product_id: string;
  color_key: string;
  label: string;
  sort_order: number;
}

interface ImageRow {
  id: string;
  product_id: string;
  color_id: string | null;
  storage_path: string;
  alt_text: string | null;
  sort_order: number;
}

interface ProductRow {
  id: string;
  slug: string;
  name: string;
  category: Product['category'];
  price: number;
  compare_at_price: number | null;
  short_description: string;
  description: string;
  age_range: string;
  hue: Product['hue'];
  image_url: string | null;
  featured: boolean;
  in_stock: boolean;
  category_rank: number | null;
  created_at: string;
  product_variants: VariantRow[] | null;
  product_colors: ColorRow[] | null;
  product_images: ImageRow[] | null;
}

// ستون‌ها را اسم‌به‌اسم می‌خوانیم: ستون stock عمداً برای عموم بسته است
// و select('*') روی product_variants خطای دسترسی می‌دهد.
const PRODUCT_SELECT = `
  *,
  product_variants (id, product_id, size_cm, color_id, price, compare_at_price, in_stock, is_default),
  product_colors (id, product_id, color_key, label, sort_order),
  product_images (id, product_id, color_id, storage_path, alt_text, sort_order)
`;

function mapVariant(row: VariantRow): ProductVariant {
  return {
    id: row.id,
    sizeCm: row.size_cm ?? undefined,
    colorId: row.color_id ?? undefined,
    price: row.price,
    compareAtPrice: row.compare_at_price ?? undefined,
    inStock: row.in_stock,
    isDefault: row.is_default,
  };
}

function mapColor(row: ColorRow): ProductColor {
  return { id: row.id, key: row.color_key, label: row.label, sortOrder: row.sort_order };
}

function mapImage(row: ImageRow, productName: string): ProductImage {
  // آدرس را از مسیر کنترل‌شده‌ی دیتابیس (با قید CHECK) و کلاینت رسمی می‌سازیم.
  const { data } = supabase.storage.from('product-images').getPublicUrl(row.storage_path);
  return {
    id: row.id,
    colorId: row.color_id ?? undefined,
    url: data.publicUrl,
    alt: row.alt_text ?? productName,
    sortOrder: row.sort_order,
  };
}

function mapRow(row: ProductRow): Product {
  const variants = (row.product_variants ?? [])
    .map(mapVariant)
    .sort((a, b) => Number(b.isDefault) - Number(a.isDefault) || a.price - b.price);
  const colors = (row.product_colors ?? []).map(mapColor).sort((a, b) => a.sortOrder - b.sortOrder);
  const images = (row.product_images ?? [])
    .map((img) => mapImage(img, row.name))
    .sort((a, b) => a.sortOrder - b.sortOrder);

  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    category: row.category,
    price: row.price,
    compareAtPrice: row.compare_at_price ?? undefined,
    shortDescription: row.short_description,
    description: row.description,
    ageRange: row.age_range,
    hue: row.hue,
    imageUrl: row.image_url ?? undefined,
    featured: row.featured,
    inStock: row.in_stock,
    categoryRank: row.category_rank ?? undefined,
    createdAt: row.created_at,
    variants,
    colors,
    images,
  };
}

export async function fetchProducts(): Promise<Product[]> {
  const { data, error } = await supabase.from('products').select(PRODUCT_SELECT);
  if (error) throw error;
  return (data as unknown as ProductRow[]).map(mapRow);
}