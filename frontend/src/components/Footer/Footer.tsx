import { Link } from 'react-router-dom';
import { toPersianDigits } from '../../utils/formatPrice';
import styles from './Footer.module.css';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        <div>
          <span className={styles.logo}>۴کیدز</span>
          <p className={styles.tagline}>
            عروسک، گیره‌سر، تل و ست‌های هدیه برای کودکان؛ با ارسال به سراسر ایران.
          </p>
        </div>

        <div className={styles.col}>
          <h3>لینک‌های سریع</h3>
          <ul>
            <li>
              <Link to="/">خانه</Link>
            </li>
            <li>
              <Link to="/shop">فروشگاه</Link>
            </li>
            <li>
              <Link to="/wishlist">علاقه‌مندی‌ها</Link>
            </li>
            <li>
              <Link to="/cart">سبد خرید</Link>
            </li>
          </ul>
        </div>

        <div className={styles.col}>
          <h3>ارتباط با ما</h3>
          <p className={styles.tagline}>راه‌های ارتباطی و پرداخت کارت‌به‌کارت به‌زودی تکمیل می‌شود.</p>
        </div>
      </div>

      <div className={`container ${styles.bottom}`}>
        <span>© {toPersianDigits(year)} ۴کیدز. تمام حقوق محفوظ است.</span>
      </div>
    </footer>
  );
}
