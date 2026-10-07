import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { HeroCarousel } from '../components/HeroCarousel/HeroCarousel';
import { ProductCard } from '../components/ProductCard/ProductCard';
import { useProducts } from '../context/ProductsContext';
import { CATEGORY_LABELS } from '../types/product';
import { HOME_VISIBLE_CATEGORIES, buildHomeSections } from '../utils/homeSections';
import styles from './HomePage.module.css';
import { toPersianDigits } from '../utils/formatPrice';

export function HomePage() {
  const { products, loading, error } = useProducts();
  const sections = useMemo(() => buildHomeSections(products), [products]);

  return (
    <div>
      <HeroCarousel />

      <section className="section">
        <div className="container">
          <h1 className={styles.homeTitle}>
            فروشگاه ۴کیدز؛ خرید عروسک، اکسسوری مو و لوازم فانتزی
          </h1>
          <p className={styles.homeIntro}>
            عروسک، جاکلیدی، کیف چرم و اکسسوری مو با ارسال به سراسر ایران.
          </p>
          <div className="section-heading">
            <h2>دسته‌بندی‌ها</h2>
          </div>
          <div className={styles.categoryGrid}>
            {HOME_VISIBLE_CATEGORIES.map((category) => (
              <Link key={category} to={`/shop?category=${category}`} className={styles.categoryCard}>
                {CATEGORY_LABELS[category]}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-heading">
            <h2>محصولات</h2>
            <Link to="/shop" className="btn btn-outline">
              مشاهده همه
            </Link>
          </div>

          {loading && <p>در حال بارگذاری محصولات...</p>}
          {error && <p>{error}</p>}
          {!loading &&
            !error &&
            sections.map((section) => (
              <div key={section.category} className={styles.categorySection}>
                <div className="section-heading">
                  <h3 className={styles.categoryTitle}>{CATEGORY_LABELS[section.category]}</h3>
                  <Link to={`/shop?category=${section.category}`} className="btn btn-outline">
                    مشاهده همه
                  </Link>
                </div>
                <div className={styles.sectionGrid}>
                  {section.products.map((product, index) => (
                    <div key={product.id} className={index === 3 ? styles.desktopOnly : undefined}>
                      <ProductCard product={product} />
                    </div>
                  ))}
                  {section.total > 3 && (
                    <Link
                      to={`/shop?category=${section.category}`}
                      className={`${styles.moreTile} ${section.total === 4 ? styles.moreTileCompactOnly : ''}`}
                    >
                      <span>
                        سایر محصولات این دسته{' '}
                        <span className="visually-hidden">{CATEGORY_LABELS[section.category]}</span>
                      </span>
                      <span className={styles.moreTileCount}>
                        {toPersianDigits(section.total)} محصول
                      </span>
                      <span>
                        مشاهده کامل این دسته <span aria-hidden="true">←</span>
                      </span>
                    </Link>
                  )}
                </div>
              </div>
            ))}
        </div>
      </section>
    </div>
  );
}