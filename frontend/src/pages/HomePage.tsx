import { Link } from 'react-router-dom';
import { HeroCarousel } from '../components/HeroCarousel/HeroCarousel';
import { ProductCard } from '../components/ProductCard/ProductCard';
import { useProducts } from '../context/ProductsContext';
import { CATEGORY_LABELS, type ProductCategory } from '../types/product';
import styles from './HomePage.module.css';

const CATEGORY_ORDER: ProductCategory[] = ['cartoon-doll', 'silicone-doll', 'surprise-doll', 'piano-doll', 'hair-accessory', 'keychain', 'leather-bag', 'pipe-lighter', 'vape', 'earplug'];

export function HomePage() {

  const { products, loading, error } = useProducts();

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
            {CATEGORY_ORDER.map((category) => (
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
          {!loading && !error && (
            <div className="product-grid">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}