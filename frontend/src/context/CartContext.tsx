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

export interface CartLine {
  productId: string;
  quantity: number;
}

export interface CartItemDetailed extends CartLine {
  product: Product;
}

interface CartContextValue {
  items: CartItemDetailed[];
  itemCount: number;
  subtotal: number;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  setQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);
const STORAGE_KEY = '4kids:cart';

function readStoredCart(): CartLine[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (line): line is CartLine =>
        typeof line?.productId === 'string' && typeof line?.quantity === 'number'
    );
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>(() => readStoredCart());

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      // Storage can fail in private browsing; the cart still works in-memory.
    }
  }, [lines]);

  const addToCart = (product: Product, quantity = 1) => {
    setLines((current) => {
      const existing = current.find((line) => line.productId === product.id);
      if (existing) {
        return current.map((line) =>
          line.productId === product.id
            ? { ...line, quantity: line.quantity + quantity }
            : line
        );
      }
      return [...current, { productId: product.id, quantity }];
    });
  };

  const removeFromCart = (productId: string) => {
    setLines((current) => current.filter((line) => line.productId !== productId));
  };

  const setQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }
    setLines((current) =>
      current.map((line) => (line.productId === productId ? { ...line, quantity } : line))
    );
  };

  const clearCart = () => setLines([]);

  const items = useMemo<CartItemDetailed[]>(
    () =>
      lines
        .map((line) => {
          const product = products.find((item) => item.id === line.productId);
          return product ? { ...line, product } : null;
        })
        .filter((item): item is CartItemDetailed => item !== null),
    [lines]
  );

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.quantity * item.product.price, 0);

  const value: CartContextValue = {
    items,
    itemCount,
    subtotal,
    addToCart,
    removeFromCart,
    setQuantity,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within a CartProvider');
  return ctx;
}
