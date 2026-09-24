import { useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { getProductBySlug, getRelatedProducts } from '../data/products';
import { ProductMedia } from '../components/ProductMedia/ProductMedia';
import { ProductCard } from '../components/ProductCard/ProductCard';
import { QuantitySelector } from '../components/QuantitySelector/QuantitySelector';
import { HeartIcon } from '../components/icons/Icons';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';
import { formatToman, discountPercent } from '../utils/formatPrice';
import { CATEGORY_LABELS } from '../types/product';
import styles from './ProductDetailPage.module.css';

export function ProductDetailPage() {
  const { slug = '' } = useParams();
  const product = getProductBySlug(slug);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const { showToast } = useToast();

  if (!product) {
    return <Navigate to="/404" replace />;
  }

  const discount = discountPercent(product.price, product.compareAtPrice);
  const wishlisted = isWishlisted(product.id);
  const related = getRelatedProducts(product);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    showToast('محصول به سبد خرید اضافه شد');
  };

  const handleWishlist = () => {
    toggleWishlist(product);
    showToast(wishlisted ? 'از علاقه‌مندی‌ها حذف شد' : 'به علاقه‌مندی‌ها اضافه شد');
  };

  return (
    <div className="container">
      <nav className={styles.breadcrumbs} aria-label="مسیر صفحه">
        <Link to="/">خانه</Link>
        <span aria-hidden="true">/</span>
        <Link to="/shop">فروشگاه</Link>
        <span aria-hidden="true">/</span>
        <Link to={`/shop?category=${product.category}`}>{CATEGORY_LABELS[product.category]}</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{product.name}</span>
      </nav>

      <div className={styles.layout}>
        <ProductMedia product={product} priority className={styles.media} />

        <div className={styles.info}>
          <span className="badge badge-gold">{CATEGORY_LABELS[product.category]}</span>
          <h1 className={styles.title}>{product.name}</h1>

          <div className={styles.priceRow}>
            <span className="price">{formatToman(product.price)}</span>
            {product.compareAtPrice && (
              <span className="price-compare">{formatToman(product.compareAtPrice)}</span>
            )}
            {discount && <span className="badge badge-danger">{discount}٪ تخفیف</span>}
          </div>

          <p className={styles.description}>{product.description}</p>

          <dl className={styles.specs}>
            <div>
              <dt>رده سنی</dt>
              <dd>{product.ageRange}</dd>
            </div>
            <div>
              <dt>وضعیت موجودی</dt>
              <dd className={product.inStock ? styles.inStock : styles.outOfStock}>
                {product.inStock ? 'موجود' : 'ناموجود'}
              </dd>
            </div>
          </dl>

          <div className={styles.actionsRow}>
            <QuantitySelector value={quantity} onChange={setQuantity} productName={product.name} />
            <button
              type="button"
              className="btn btn-primary btn-block"
              onClick={handleAddToCart}
              disabled={!product.inStock}
            >
              {product.inStock ? 'افزودن به سبد خرید' : 'ناموجود'}
            </button>
            <button
              type="button"
              className={`btn btn-outline ${styles.wishlistBtn}`}
              onClick={handleWishlist}
              aria-pressed={wishlisted}
            >
              <HeartIcon filled={wishlisted} />
              {wishlisted ? 'در علاقه‌مندی‌ها' : 'افزودن به علاقه‌مندی‌ها'}
            </button>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="section">
          <div className="section-heading">
            <h2>محصولات مرتبط</h2>
          </div>
          <div className="product-grid">
            {related.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
