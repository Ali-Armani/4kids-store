import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { getFeaturedProducts } from '../../data/products';
import { ProductMedia } from '../ProductMedia/ProductMedia';
import { ChevronIcon } from '../icons/Icons';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import { formatToman } from '../../utils/formatPrice';
import { CATEGORY_LABELS } from '../../types/product';
import styles from './HeroCarousel.module.css';

const AUTO_PLAY_MS = 5000;

export function HeroCarousel() {
  const slides = getFeaturedProducts();
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const timerRef = useRef<number | null>(null);

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const goTo = useCallback(
    (next: number) => {
      const total = slides.length;
      setIndex(((next % total) + total) % total);
    },
    [slides.length]
  );

  useEffect(() => {
    if (isPaused || prefersReducedMotion || slides.length <= 1) return;
    timerRef.current = window.setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, AUTO_PLAY_MS);
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [isPaused, prefersReducedMotion, slides.length]);

  if (slides.length === 0) return null;

  const activeProduct = slides[index];

  const handleQuickAdd = () => {
    addToCart(activeProduct, 1);
    showToast('محصول به سبد خرید اضافه شد');
  };

  return (
    <section
      className={styles.hero}
      role="region"
      aria-roledescription="carousel"
      aria-label="محصولات ویژه"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <div className="container">
        <div className={styles.slide} key={activeProduct.id}>
          <div className={styles.mediaWrap}>
            <Link
              to={`/product/${activeProduct.slug}`}
              className={styles.mediaLink}
              aria-label={`مشاهده محصول ${activeProduct.name}`}
            >
              <ProductMedia product={activeProduct} priority className={styles.media} />
            </Link>
            <button
              type="button"
              className={`${styles.navBtn} ${styles.navPrev}`}
              onClick={() => goTo(index - 1)}
              aria-label="اسلاید قبلی"
            >
              <ChevronIcon direction="right" />
            </button>
            <button
              type="button"
              className={`${styles.navBtn} ${styles.navNext}`}
              onClick={() => goTo(index + 1)}
              aria-label="اسلاید بعدی"
            >
              <ChevronIcon direction="left" />
            </button>
          </div>

          <div className={styles.info}>
            <span className="badge badge-gold">{CATEGORY_LABELS[activeProduct.category]}</span>
            <h1 className={styles.title}>{activeProduct.name}</h1>
            <p className={styles.description}>{activeProduct.shortDescription}</p>
            <div className={styles.priceRow}>
              <span className="price">{formatToman(activeProduct.price)}</span>
              {activeProduct.compareAtPrice && (
                <span className="price-compare">{formatToman(activeProduct.compareAtPrice)}</span>
              )}
            </div>
            <div className={styles.actions}>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleQuickAdd}
                disabled={!activeProduct.inStock}
              >
                {activeProduct.inStock ? 'افزودن سریع به سبد' : 'ناموجود'}
              </button>
              <Link to={`/product/${activeProduct.slug}`} className="btn btn-outline">
                مشاهده محصول
              </Link>
            </div>
          </div>
        </div>

        <div className={styles.dots}>
          {slides.map((product, dotIndex) => (
            <button
              key={product.id}
              type="button"
              aria-label={`رفتن به اسلاید ${dotIndex + 1} از ${slides.length}: ${product.name}`}
              aria-current={dotIndex === index ? 'true' : undefined}
              className={`${styles.dot} ${dotIndex === index ? styles.dotActive : ''}`}
              onClick={() => goTo(dotIndex)}
            />
          ))}
        </div>

        <p className="visually-hidden" aria-live="polite">
          نمایش اسلاید {index + 1} از {slides.length}: {activeProduct.name}
        </p>
      </div>
    </section>
  );
}
