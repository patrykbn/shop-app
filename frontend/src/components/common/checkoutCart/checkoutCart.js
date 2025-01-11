import styles from './checkoutCart.module.scss';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '../../../redux/cartRedux';

const CheckoutCart = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const itemsInCart = useSelector(state => state.cart.itemsInCart);

    const handleCartClick = () => {
        navigate('/cart');
    };

    const handleClearCart = () => {
        dispatch(clearCart());
    };

    return (
        <div className={styles.cartContainer}>
            <div className={styles.cartButton} onClick={handleCartClick}>
                <span className={styles.cartHoverText}>to checkout!</span>
                <FontAwesomeIcon icon={faCartShopping} className={styles.cartIcon} />
                <span className={styles.cartText}>{itemsInCart > 10 ? '10+' : itemsInCart}</span>
            </div>
            <button onClick={handleClearCart}>Clear Cart</button>
        </div>
    );
};

export default CheckoutCart;
