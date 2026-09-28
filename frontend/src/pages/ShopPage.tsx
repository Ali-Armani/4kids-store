import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductCard } from '../components/ProductCard/ProductCard';
import { CategoryFilter, type CategoryValue } from '../components/CategoryFilter/CategoryFilter';
import { SearchBar } from '../components/SearchBar/SearchBar';
import { EmptyState } from '../components/EmptyState/EmptyState';
import { useProducts } from '../context/ProductsContext';
import { toPersianDigits } from '../utils/formatPrice';
import { CATEGORY_LABELS, type ProductCategory } from '../types/product';
import { usePageMeta } from '../hooks/usePageMeta';
import styles from './ShopPage.module.css';

// این دو دسته فقط اطلاعاتی‌اند و سبد خرید ندارند، پس «خرید» در عنوانشان نمی‌آید
const INFO_ONLY_CATEGORIES: ProductCategory[] = ['pipe-lighter', 'vape'];

export function ShopPage() {
  const { products, loading, error } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') ?? '';

  // مقدار category از آدرس فقط وقتی پذیرفته می‌شود که یکی از کلیدهای واقعی باشد
  const rawCategory = searchParams.get('category');
  const activeCategory: ProductCategory | null =
    rawCategory && Object.prototype.hasOwnProperty.call(CATEGORY_LABELS, rawCategory)
      ? (rawCategory as ProductCategory)
      : null;
  const category: CategoryValue = activeCategory ?? 'all';

  const categoryLabel = activeCategory ? CATEGORY_LABELS[activeCategory] : null;
  const isInfoOnly = activeCategory !== null && INFO_ONLY_CATEGORIES.includes(activeCategory);
  const heading = !categoryLabel
    ? 'خرید عروسک و اکسسوری'
    : isInfoOnly
      ? categoryLabel
      : `خرید ${categoryLabel}`;

  // این hook باید قبل از هر return شرطی بیاید
  usePageMeta({
    title: `${heading} | ۴کیدز`,
    description: categoryLabel
      ? `${heading} در فروشگاه آنلاین ۴کیدز؛ مشاهده مدل‌ها و قیمت‌ها.`
      : 'مشاهده و خرید عروسک، اکسسوری مو، جاکلیدی و کیف چرم در فروشگاه آنلاین ۴کیدز.',
    noindex: query.trim() !== '',
  });

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return products.filter((product) => {
      const matchesCategory = category === 'all' || product.category === category;
      const matchesQuery =
        normalizedQuery.length === 0 ||
        product.name.toLowerCase().includes(normalizedQuery) ||
        product.shortDescription.toLowerCase().includes(normalizedQuery);
      return matchesCategory && matchesQuery;
    });
  }, [products, query, category]);

  const updateParams = (next: { q?: string; category?: CategoryValue }) => {
    const params = new URLSearchParams(searchParams);
    if (next.q !== undefined) {
      if (next.q) params.set('q', next.q);
      else params.delete('q');
    }
    if (next.category !== undefined) {
      if (next.category && next.category !== 'all') params.set('category', next.category);
      else params.delete('category');
    }
    setSearchParams(params);
  };

  if (loading) {
    return (
      <div className="container">
        <p>در حال بارگذاری محصولات...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="page-header container">
        <h1>{heading}</h1>
        <p>{toPersianDigits(filtered.length)} محصول</p>
      </div>

      <div className="container">
        <div className={styles.toolbar}>
          <div className={styles.searchWrap}>
            <SearchBar onSearch={(value) => updateParams({ q: value })} initialValue={query} />
          </div>
          <CategoryFilter value={category} onChange={(value) => updateParams({ category: value })} />
        </div>

        {filtered.length > 0 ? (
          <div className={`product-grid ${styles.grid}`}>
            {filtered.map((product, index) => (
              <ProductCard key={product.id} product={product} priority={index === 0} />
            ))}
          </div>
        ) : (
          <EmptyState title="محصولی پیدا نشد" description="عبارت جستجو

یا دسته‌بندی را تغییر دهید." />
        )}
      </div>
    </div>
  );
}