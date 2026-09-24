import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ProductMedia } from '../components/ProductMedia/ProductMedia';
import { QuantitySelector } from '../components/QuantitySelector/QuantitySelector';
import { EmptyState } from '../components/EmptyState/EmptyState';
import { CloseIcon } from '../components/icons/Icons';
import { formatToman } from '../utils/formatPrice';
import styles from './CartPage.module.css';

export function CartPage() {
  const { items, subtotal, setQuantity, removeFromCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="container">
        <EmptyState
          title="سبد خرید شما خالی است"
          description="هنوز محصولی به سبد خرید اضافه نکرده‌اید."
          actionLabel="رفتن به فروشگاه"
          actionTo="/shop"
        />
      </div>
    );
  }

  return (
    <div className="container">
      <div className="page-header">
        <h1>سبد خرید</h1>
      </div>

      <div className={styles.layout}>
        <ul className={styles.list}>
          {items.map((item) => (
            <li key={item.productId} className={styles.row}>
              <button
                type="button"
                className={styles.removeBtn}
                onClick={() => removeFromCart(item.productId)}
                aria-label={`حذف ${item.product.name} از سبد خرید`}
              >
                <CloseIcon />
              </button>

              <div className={styles.rowTop}>
                <Link to={`/product/${item.product.slug}`} className={styles.thumbLink}>
                  <ProductMedia product={item.product} className={styles.thumb} />
                </Link>
                <div className={styles.rowInfo}>
                  <Link to={`/product/${item.product.slug}`} className={styles.name}>
                    {item.product.name}
                  </Link>
                  <span className="price">{formatToman(item.product.price)}</span>
                </div>
              </div>

              <div className={styles.rowBottom}>
                <QuantitySelector
                  value={item.quantity}
                  onChange={(next) => setQuantity(item.productId, next)}
                  productName={item.product.name}
                />
                <span className={styles.lineTotal}>
                  {formatToman(item.product.price * item.quantity)}
                </span>
              </div>
            </li>
          ))}
        </ul>

        <aside className={styles.summary}>
          <h2>جمع سبد خرید</h2>
          <div className={styles.summaryRow}>
            <span>جمع کل</span>
            <span className="price">{formatToman(subtotal)}</span>
          </div>
          <p className={styles.note}>
            هزینه ارسال و روش پرداخت (کارت‌به‌کارت) پس از اتصال بخش سفارش‌ها به سایت مشخص خواهد شد.
          </p>
        </aside>
      </div>
    </div>
  );
}
