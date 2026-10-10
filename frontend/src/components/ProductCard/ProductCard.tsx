import { Link } from 'react-router-dom';
import type { Product } from '../../types/product';
import { ProductMedia } from '../ProductMedia/ProductMedia';
import { HeartIcon } from '../icons/Icons';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useToast } from '../../context/ToastContext';
import { formatToman, discountPercent } from '../../utils/formatPrice';
import styles from './ProductCard.module.css';
import { isInfoOnlyCategory, isPurchasable } from '../../utils/purchasable';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const { showToast } = useToast();
  const wishlisted = isWishlisted(product.id);
  const discount = discountPercent(product.price, product.compareAtPrice);
  const infoOnly = isInfoOnlyCategory(product.category);
  const purchasable = isPurchasable(product);

  const handleAddToCart = () => {
    if (!purchasable) return;
    addToCart(product, 1);
    showToast('محصول به سبد خرید اضافه شد');
  };

  const handleToggleWishlist = () => {
    toggleWishlist(product);
    showToast(wishlisted ? 'از علاقه‌مندی‌ها حذف شد' : 'به علاقه‌مندی‌ها اضافه شد');
  };

  return (
    <article className={styles.card}>
      <div className={styles.mediaWrap}>
        <Link to={`/product/${product.slug}`} className={styles.mediaLink} aria-label={product.name}>
          <ProductMedia product={product} priority={priority} className={styles.media} />
        </Link>
        {infoOnly ? (
          <Link to={`/product/${product.slug}`} className={`btn btn-outline ${styles.addBtn}`}>
            مشاهده اطلاعات
          </Link>
        ) : (
          <button
            type="button"
            className={`btn btn-outline ${styles.addBtn}`}
            onClick={handleAddToCart}
            disabled={!purchasable}
          >
            {purchasable ? 'افزودن به سبد' : 'ناموجود'}
          </button>
        )}
        {discount && <span className={`badge badge-danger ${styles.discountBadge}`}>{discount}٪ تخفیف</span>}
        {!product.inStock && <span className={`badge ${styles.stockBadge}`}>ناموجود</span>}
      </div>

      <div className={styles.body}>
        <Link to={`/product/${product.slug}`} className={styles.name}>
          {product.name}
        </Link>
        <div className={styles.priceRow}>
          <span className="price">{formatToman(product.price)}</span>
          {product.compareAtPrice && (
            <span className="price-compare">{formatToman(product.compareAtPrice)}</span>
          )}
        </div>
        <button
          type="button"
          className={`btn btn-outline ${styles.addBtn}`}
          onClick={handleAddToCart}
          disabled={!product.inStock}
        >
          {product.inStock ? 'افزودن به سبد' : 'ناموجود'}
        </button>
      </div>
    </article>
  );
}