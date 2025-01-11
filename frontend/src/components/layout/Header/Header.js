import styles from './Header.module.scss';
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import CheckoutCart from '../../common/checkoutCart/checkoutCart';

const Header = () => {
    const navigate = useNavigate();
    const [scrolled, setScrolled] = useState(false);

    const handleHomeClick = () => {
        navigate('/');
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
                    <img src='/images/logo.png' alt='logo' className={styles.logo} onClick={handleHomeClick}/>
                </div>
                <h3 className={styles.titleSubText}>Buy a piece of my imagination...</h3>
            </div>
            <CheckoutCart  />
        </div>
    );
};

export default Header;
