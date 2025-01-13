import styles from './Footer.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTiktok, faTwitter, faInstagram, faPinterest, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.contactInfo}>
        <span className={styles.name}>Jane Doe, Warsaw Poland</span>
        <div className={styles.contactInfoContainer}>
          <FontAwesomeIcon icon={faEnvelope} className={styles.icon}/>
          <span className={styles.text}>info@example.mail</span>
        </div>
        <div className={styles.contactInfoContainer}>
          <FontAwesomeIcon icon={faPhone} className={styles.icon}/>
          <span className={styles.text}>+123 456 789</span>
        </div>
      </div>
      <div className={styles.socialIcons}>
        <FontAwesomeIcon icon={faTiktok} className={styles.socialIcon}/>
        <FontAwesomeIcon icon={faTwitter} className={styles.socialIcon}/>
        <FontAwesomeIcon icon={faInstagram} className={styles.socialIcon}/>
        <FontAwesomeIcon icon={faPinterest} className={styles.socialIcon}/>
        <FontAwesomeIcon icon={faWhatsapp} className={styles.socialIcon}/>
      </div>
    </div>
  );
};

export default Footer;
