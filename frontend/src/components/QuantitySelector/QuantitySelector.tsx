import { toPersianDigits } from '../../utils/formatPrice';
import styles from './QuantitySelector.module.css';

interface QuantitySelectorProps {
  value: number;
  onChange: (next: number) => void;
  min?: number;
  max?: number;
  productName?: string;
}

export function QuantitySelector({
  value,
  onChange,
  min = 1,
  max = 99,
  productName,
}: QuantitySelectorProps) {
  const decrease = () => onChange(Math.max(min, value - 1));
  const increase = () => onChange(Math.min(max, value + 1));

  return (
    <div className={styles.wrap}>
      <button
        type="button"
        className={styles.btn}
        onClick={decrease}
        disabled={value <= min}
        aria-label={productName ? `کاهش تعداد ${productName}` : 'کاهش تعداد'}
      >
        −
      </button>
      <span className={styles.value} aria-live="polite">
        {toPersianDigits(value)}
      </span>
      <button
        type="button"
        className={styles.btn}
        onClick={increase}
        disabled={value >= max}
        aria-label={productName ? `افزایش تعداد ${productName}` : 'افزایش تعداد'}
      >
        +
      </button>
    </div>
  );
}
