import { FaVk, FaTelegram } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import styles from './footer.module.css';
const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={`${styles.container} container`}>
        <Link to={'/'}>
          <FaVk
            color='#fff'
            size={32}
          />
        </Link>
        <div className={styles.text}>Development by Aleksandr Ostrovsqi</div>

        <Link
          className={styles.link}
          to='https://t.me/Al_ostrovskii'
        >
          <FaTelegram
            size={32}
            color='#fff'
          />
        </Link>
      </div>
    </div>
  );
};

export default Footer;
