import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { Product } from '../types/product';
import { products } from '../data/products';

interface WishlistContextValue {
  items: Product[];
  isWishlisted: (productId: string) => boolean;
  toggleWishlist: (product: Product) => void;
}

const WishlistContext = createContext<WishlistContextValue | undefined>(undefined);
const STORAGE_KEY = '4kids:wishlist';

function readStoredWishlist(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed)
      ? parsed.filter((id): id is string => typeof id === 'string')
      : [];
  } catch {
    return [];
  }
}

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [productIds, setProductIds] = useState<string[]>(() => readStoredWishlist());

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(productIds));
    } catch {
      // Storage can fail in private browsing; the wishlist still works in-memory.
    }
  }, [productIds]);

  const toggleWishlist = (product: Product) => {
    setProductIds((current) =>
      current.includes(product.id)
        ? current.filter((id) => id !== product.id)
        : [...current, product.id]
    );
  };

  const isWishlisted = (productId: string) => productIds.includes(productId);

  const items = useMemo(
    () => products.filter((product) => productIds.includes(product.id)),
    [productIds]
  );

  const value: WishlistContextValue = { items, isWishlisted, toggleWishlist };

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist(): WishlistContextValue {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used within a WishlistProvider');
  return ctx;
}
