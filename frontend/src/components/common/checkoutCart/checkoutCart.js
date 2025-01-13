import styles from './checkoutCart.module.scss';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { useState } from 'react';

const CheckoutCart = () => {
    const navigate = useNavigate();
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);
    const itemsInCart = useSelector(state => state.cart.itemsInCart);

    const handleCartClick = () => {
        navigate('/cart');
    };
    

    return (
        <div className={styles.cartContainer}>
            <div className={styles.cartButton} onClick={handleCartClick}>
                <span className={styles.cartHoverText}>to checkout!</span>
                <FontAwesomeIcon icon={faCartShopping} className={styles.cartIcon} />
                <span className={styles.cartText}>{itemsInCart > 10 ? '10+' : itemsInCart}</span>
            </div>
        </div>
    );
};

export default CheckoutCart;
