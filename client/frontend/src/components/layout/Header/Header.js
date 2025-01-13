import styles from './Header.module.scss';
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import CheckoutCart from '../../common/checkoutCart/checkoutCart';

const Header = () => {
    const navigate = useNavigate();
    const [scrolled, setScrolled] = useState(false);

    const handleHomeClick = () => {
        navigate('/home');
    }

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 0);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className={classNames(styles.header, { [styles.scrolled]: scrolled })}>
            <div className={styles.titleContainer}>
                <div className={styles.logoContainer}>
                    <img src='/images/logo.jpg' alt='logo' className={styles.logo} onClick={handleHomeClick} loading="lazy" fetchPriority="high" />
                    <span className={styles.mobileText} onClick={handleHomeClick}>Imagined & Made</span>
                </div>
                <span className={styles.titleSubText}>Buy a piece of my imagination...</span>
            </div>
            <CheckoutCart />
        </div>
    );
};

export default Header;
