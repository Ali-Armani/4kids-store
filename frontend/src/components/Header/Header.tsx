import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { MenuIcon, CloseIcon, HeartIcon, CartIcon } from '../icons/Icons';
import { SearchBar } from '../SearchBar/SearchBar';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { toPersianDigits } from '../../utils/formatPrice';
import styles from './Header.module.css';

const NAV_LINKS = [
  { to: '/', label: 'خانه' },
  { to: '/shop', label: 'فروشگاه' },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement | null>(null);
  const navigate = useNavigate();
  const { itemCount: cartCount } = useCart();
  const { items: wishlistItems } = useWishlist();

  useEffect(() => {
    function handleKey(event: KeyboardEvent) {
      if (event.key === 'Escape' && mobileOpen) {
        setMobileOpen(false);
        toggleRef.current?.focus();
      }
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [mobileOpen]);

  const closeMobile = () => setMobileOpen(false);

  const handleSearch = (query: string) => {
    navigate(query ? `/shop?q=${encodeURIComponent(query)}` : '/shop');
    closeMobile();
  };

  return (
    <header className={styles.header}>
      <div className={`container ${styles.bar}`}>
        <button
          type="button"
          ref={toggleRef}
          className={styles.menuToggle}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          aria-label={mobileOpen ? 'بستن منو' : 'باز کردن منو'}
          onClick={() => setMobileOpen((open) => !open)}
        >
          {mobileOpen ? <CloseIcon /> : <MenuIcon />}
        </button>

        <Link to="/" className={styles.logo} onClick={closeMobile}>
          ۴کیدز
        </Link>

        <nav className={styles.nav} aria-label="ناوبری اصلی">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className={styles.searchDesktop}>
          <SearchBar onSearch={handleSearch} compact />
        </div>

        <div className={styles.actions}>
          <Link
            to="/wishlist"
            className={styles.iconLink}
            aria-label={`علاقه‌مندی‌ها، ${toPersianDigits(wishlistItems.length)} مورد`}
          >
            <HeartIcon />
            {wishlistItems.length > 0 && (
              <span className={styles.count}>{toPersianDigits(wishlistItems.length)}</span>
            )}
          </Link>
          <Link
            to="/cart"
            className={styles.iconLink}
            aria-label={`سبد خرید، ${toPersianDigits(cartCount)} مورد`}
          >
            <CartIcon />
            {cartCount > 0 && <span className={styles.count}>{toPersianDigits(cartCount)}</span>}
          </Link>
        </div>
      </div>

      {mobileOpen && (
        <div id="mobile-nav" className={styles.mobilePanel}>
          <div className="container">
            <SearchBar onSearch={handleSearch} />
            <nav className={styles.mobileNav} aria-label="ناوبری موبایل">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  className={styles.mobileNavLink}
                  onClick={closeMobile}
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
