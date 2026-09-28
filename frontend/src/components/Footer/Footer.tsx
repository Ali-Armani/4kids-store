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
            انواع عروسک، اکسسوری مو، گوش‌گیر فانتزی، جاکلیدی، کیف چرم و جاکارتی و غیره. با ارسال به سراسر ایران!
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
          <h3>درباره ما</h3>
          <p className={styles.tagline}>
            فروشگاه 4kids فعالیت خود را از سال <strong>86</strong> با عنوان عروسک فروشی <strong>قزل</strong> در بازارچه ساحلی بندر شروع کرد. سپس به قلب بندر ترکمن انتقال یافت.
            <br />
             آدرس ما: خیابان آزادی - بین آزادی <strong>4</strong> و <strong>6</strong> - فروشگاه 4kids
             <br />
             تماس با ما: 09113880126
          </p>
        </div>
      </div>

      <div className={`container ${styles.bottom}`}>
        <span>© {toPersianDigits(year)} ۴کیدز. تمام حقوق محفوظ است.</span>
      </div>
    </footer>
  );
}
