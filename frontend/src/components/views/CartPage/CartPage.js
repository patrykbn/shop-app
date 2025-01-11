import styles from './CartPage.module.scss';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCart, removeFromCart } from '../../../redux/cartRedux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import ProductInCart from '../../common/productInCart/productInCart';
import OrderSummary from '../../common/orderSummary/orderSummary';
import QuantityWidget from '../../common/quantityWidget/quantityWidget';
import CartComment from '../../common/cartComment.js/cartComment';

const CartPage = () => {
  const dispatch = useDispatch();
  const cart = useSelector(getCart);

  const productsInCart = cart.products;

  const handleDeleteProductFromCart = (cartItemId) => {
    console.log(cartItemId);
    dispatch(removeFromCart({ id: cartItemId }));
  };
  
  return (
    <div className={styles.cartPage}>
      <div className={styles.cartProducts}>
        {productsInCart.map(product => (
          <div key={product.id} className={styles.product}>
            <ProductInCart productId={product.productId} productOption={product.option} productTotalPrice={product.totalPrice}/>
            <div className={styles.productInCartDetails}>
              <QuantityWidget orderItemId={product.id} quantity={product.quantity} />
              <CartComment productId={product.id} productComment={product.comment} />
            </div>
            <div className={styles.deleteContainer}>
              <FontAwesomeIcon icon={faTrashCan} className={styles.trashIcon} onClick={() => handleDeleteProductFromCart(product.id)}/>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.orderSummaryContainer}>
        <OrderSummary orderButton={true} />
      </div>
    </div>
  );
};

export default CartPage;
