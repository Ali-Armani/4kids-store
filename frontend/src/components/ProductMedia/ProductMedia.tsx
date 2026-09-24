import type { Product } from '../../types/product';
import styles from './ProductMedia.module.css';

interface ProductMediaProps {
  product: Product;
  /** Mark true only for the currently visible above-the-fold image (e.g. the active hero slide). */
  priority?: boolean;
  className?: string;
}

export function ProductMedia({ product, priority = false, className }: ProductMediaProps) {
  const classes = [styles.frame, className].filter(Boolean).join(' ');

  if (product.imageUrl) {
    return (
      <img
        src={product.imageUrl}
        alt={product.name}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        className={classes}
      />
    );
  }

  return (
    <div className={[classes, styles.placeholder, styles[`hue-${product.hue}`]].join(' ')} aria-hidden="true">
      <svg viewBox="0 0 64 64" className={styles.motif}>
        <path
          d="M32 32c-4-10-15-15-21-10-6 5-3 16 8 17-11 1-14 12-8 17 6 5 17 0 21-10 4 10 15 15 21 10 6-5 3-16-8-17 11-1 14-12 8-17-6-5-17 0-21 10z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}
