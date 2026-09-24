import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductCard } from '../components/ProductCard/ProductCard';
import { CategoryFilter, type CategoryValue } from '../components/CategoryFilter/CategoryFilter';
import { SearchBar } from '../components/SearchBar/SearchBar';
import { EmptyState } from '../components/EmptyState/EmptyState';
import { products } from '../data/products';
import { toPersianDigits } from '../utils/formatPrice';
import styles from './ShopPage.module.css';

export function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') ?? '';
  const category = (searchParams.get('category') as CategoryValue) || 'all';

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
  }, [query, category]);

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

  return (
    <div>
      <div className="page-header container">
        <h1>فروشگاه</h1>
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
          <EmptyState title="محصولی پیدا نشد" description="عبارت جستجو یا دسته‌بندی را تغییر دهید." />
        )}
      </div>
    </div>
  );
}
