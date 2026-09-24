import { useWishlist } from '../context/WishlistContext';
import { ProductCard } from '../components/ProductCard/ProductCard';
import { EmptyState } from '../components/EmptyState/EmptyState';
import styles from './WishlistPage.module.css';

export function WishlistPage() {
  const { items } = useWishlist();

  return (
    <div className="container">
      <div className="page-header">
        <h1>علاقه‌مندی‌ها</h1>
      </div>

      {items.length > 0 ? (
        <div className={`product-grid ${styles.grid}`}>
          {items.map((product, index) => (
            <ProductCard key={product.id} product={product} priority={index === 0} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="فهرست علاقه‌مندی‌ها خالی است"
          description="محصولات مورد علاقه‌تان را با ضربه روی نماد قلب اضافه کنید."
          actionLabel="رفتن به فروشگاه"
          actionTo="/shop"
        />
      )}
    </div>
  );
}
