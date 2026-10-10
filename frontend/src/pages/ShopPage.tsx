import { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ProductCard } from '../components/ProductCard/ProductCard';
import { CategoryFilter, type CategoryValue } from '../components/CategoryFilter/CategoryFilter';
import { SearchBar } from '../components/SearchBar/SearchBar';
import { EmptyState } from '../components/EmptyState/EmptyState';
import { useProducts } from '../context/ProductsContext';
import { toPersianDigits } from '../utils/formatPrice';
import { compareForHome } from '../utils/homeSections';
import { CATEGORY_LABELS, type Product, type ProductCategory } from '../types/product';
import { usePageMeta } from '../hooks/usePageMeta';
import styles from './ShopPage.module.css';
import { INFO_ONLY_CATEGORIES } from '../utils/purchasable';

const PAGE_SIZE = 30;

/** page از آدرس ورودی کاربر است: فقط عدد صحیح ≥ ۱ پذیرفته می‌شود، هر چیز دیگر = صفحه‌ی ۱ */
function parsePage(raw: string | null): number {
  const value = Number(raw);
  return Number.isSafeInteger(value) && value >= 1 ? value : 1;
}

/** جدیدترین اول؛ اگر تاریخ‌ها برابر بود، slug تعیین‌کننده است تا ترتیب همیشه ثابت بماند */
function byNewest(a: Product, b: Product): number {
  const diff = new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  return diff !== 0 ? diff : a.slug.localeCompare(b.slug);
}

function byCategoryRank(a: Product, b: Product): number {
  return compareForHome(a, b) || a.slug.localeCompare(b.slug);
}

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

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const matches = products.filter((product) => {
      const matchesCategory = category === 'all' || product.category === category;
      const matchesQuery =
        normalizedQuery.length === 0 ||
        product.name.toLowerCase().includes(normalizedQuery) ||
        product.shortDescription.toLowerCase().includes(normalizedQuery);
      return matchesCategory && matchesQuery;
    });
    // مرتب‌سازی صریح: دیتابیس ترتیب تضمین‌شده نمی‌دهد و بدون آن صفحه‌بندی جابه‌جا می‌شود
    return matches.sort(category === 'all' ? byNewest : byCategoryRank);
  }, [products, query, category]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  // اگر page از آخرین صفحه بزرگ‌تر باشد، آخرین صفحه نمایش داده می‌شود
  const currentPage = Math.min(parsePage(searchParams.get('page')), totalPages);

  const pageProducts = useMemo(
    () => filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE),
    [filtered, currentPage]
  );

  const pageSuffix = currentPage > 1 ? ` - صفحه ${toPersianDigits(currentPage)}` : '';

  // این hook باید قبل از هر return شرطی بیاید
  usePageMeta({
    title: `${heading}${pageSuffix} | ۴کیدز`,
    description: categoryLabel
      ? `${heading} در فروشگاه آنلاین ۴کیدز؛ مشاهده مدل‌ها و قیمت‌ها.${pageSuffix}`
      : `مشاهده و خرید عروسک، اکسسوری مو، جاکلیدی و کیف چرم در فروشگاه آنلاین ۴کیدز.${pageSuffix}`,
    noindex: query.trim() !== '',
  });

  // هر بار جستجو یا دسته عوض شود، page حذف می‌شود تا کاربر به صفحه‌ی ۱ برگردد
  const updateParams = (next: { q?: string; category?: CategoryValue }) => { const params = new URLSearchParams(searchParams);
    params.delete('page');
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

  // آدرس یک صفحه‌ی مشخص، با حفظ q و category
  const pageLink = (target: number) => {
    const params = new URLSearchParams(searchParams);
    if (target > 1) params.set('page', String(target));
    else params.delete('page');
    return { search: params.toString() };
  };

  const scrollToTop = () => window.scrollTo({ top: 0 });

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
          <div className={styles.results}>
            <div className="product-grid">
              {pageProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} priority={index === 0} />
              ))}
            </div>

            {totalPages > 1 && (
              <nav className={styles.pagination} aria-label="صفحه‌بندی محصولات">
                {currentPage > 1 ? (
                  <Link
                    to={pageLink(currentPage - 1)}
                    className={`btn btn-outline ${styles.pageBtn}`}
                    onClick={scrollToTop}
                  >
                    <span aria-hidden="true">→</span> قبلی
                  </Link>
                ) : (
                  <span className={`btn btn-outline ${styles.pageBtn} ${styles.pageDisabled}`} aria-disabled="true">
                    <span aria-hidden="true">→</span> قبلی
                  </span>
                )}

                <span className={styles.pageInfo} aria-live="polite">
                  صفحه {toPersianDigits(currentPage)} از {toPersianDigits(totalPages)}
                </span>

                {currentPage < totalPages ? (
                  <Link
                    to={pageLink(currentPage + 1)}
                    className={`btn btn-outline ${styles.pageBtn}`}
                    onClick={scrollToTop}
                  >
                    بعدی <span aria-hidden="true">←</span>
                  </Link>
                ) : (
                  <span className={`btn btn-outline ${styles.pageBtn} ${styles.pageDisabled}`} aria-disabled="true">
                    بعدی <span aria-hidden="true">←</span>
                  </span>
                )}
              </nav>
            )}
          </div>
        ) : (
          <EmptyState title="محصولی پیدا نشد" description="عبارت جستجو یا دسته‌بندی را تغییر دهید." />
        )}
      </div>
    </div>
  );
}