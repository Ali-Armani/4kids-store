import { useState, type FormEvent } from 'react';
import { SearchIcon } from '../icons/Icons';
import styles from './SearchBar.module.css';

interface SearchBarProps {
  onSearch: (query: string) => void;
  initialValue?: string;
  compact?: boolean;
}

export function SearchBar({ onSearch, initialValue = '', compact = false }: SearchBarProps) {
  const [value, setValue] = useState(initialValue);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSearch(value.trim());
  };

  return (
    <form
      className={`${styles.form} ${compact ? styles.compact : ''}`}
      onSubmit={handleSubmit}
      role="search"
    >
      <label htmlFor="site-search" className="visually-hidden">
        جستجوی محصولات
      </label>
      <input
        id="site-search"
        type="search"
        className={styles.input}
        placeholder="جستجوی عروسک، گیره‌سر، تل..."
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
      <button type="submit" className={styles.submit} aria-label="جستجو">
        <SearchIcon />
      </button>
    </form>
  );
}
