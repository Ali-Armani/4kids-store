import { supabase } from '../lib/supabaseClient';
import type { Product } from '../types/product';

// شکل خام یک ردیف در جدول Supabase (snake_case)
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
}

function mapRow(row: ProductRow): Product {
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
  };
}

export async function fetchProducts(): Promise<Product[]> {
  const { data, error } = await supabase.from('products').select('*');
  if (error) throw error;
  return (data as ProductRow[]).map(mapRow);
}