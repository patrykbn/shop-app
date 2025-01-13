import React from 'react';
import styles from './OrderPage.module.scss';
import OrderSummary from '../../common/orderSummary/orderSummary';
import OrderForm from '../../common/orderForm/orderForm';
import { useSelector } from 'react-redux';
import { getCart } from '../../../redux/cartRedux';

const OrderPage = () => {
  const cart = useSelector(getCart);
  const cartCount = cart.itemsInCart;
  return (
    <div className={styles.orderPageContainer}>
       {cartCount < 1 ? (
          <div className={styles.noItemsToSubmit}>
            <span className={styles.textOne}>nothing in cart to submit!</span>
            <span className={styles.textTwo}>add something to the cart to submit order</span>
          </div>
        ):(
            <OrderForm />
         )}
      <OrderSummary orderButton={false} />
    </div>
  );
};

export default OrderPage;
