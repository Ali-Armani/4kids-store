import { CATEGORY_LABELS, type ProductCategory } from '../../types/product';
import styles from './CategoryFilter.module.css';

export type CategoryValue = ProductCategory | 'all';

interface CategoryFilterProps {
  value: CategoryValue;
  onChange: (value: CategoryValue) => void;
}

const CATEGORIES: { value: CategoryValue; label: string }[] = [
  { value: 'all', label: 'همه' },
  ...(Object.entries(CATEGORY_LABELS) as [ProductCategory, string][]).map(([value, label]) => ({
    value,
    label,
  })),
];

export function CategoryFilter({ value, onChange }: CategoryFilterProps) {
  return (
    <div className={styles.wrap} role="group" aria-label="فیلتر دسته‌بندی">
      {CATEGORIES.map((category) => (
        <button
          key={category.value}
          type="button"
          className={`${styles.chip} ${value === category.value ? styles.chipActive : ''}`}
          aria-pressed={value === category.value}
          onClick={() => onChange(category.value)}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
}
