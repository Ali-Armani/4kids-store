import { Link } from 'react-router-dom';
import styles from './EmptyState.module.css';

interface EmptyStateProps {
  title: string;
  description?: string;
  actionLabel?: string;
  actionTo?: string;
}

export function EmptyState({ title, description, actionLabel, actionTo }: EmptyStateProps) {
  return (
    <div className={styles.wrap}>
      <svg viewBox="0 0 64 64" className={styles.motif} aria-hidden="true">
        <path
          d="M32 32c-4-10-15-15-21-10-6 5-3 16 8 17-11 1-14 12-8 17 6 5 17 0 21-10 4 10 15 15 21 10 6-5 3-16-8-17 11-1 14-12 8-17-6-5-17 0-21 10z"
          fill="currentColor"
        />
      </svg>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
      {actionLabel && actionTo && (
        <Link to={actionTo} className="btn btn-primary">
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
