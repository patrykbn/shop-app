import React from 'react';
import styles from './OrderPage.module.scss';
import OrderSummary from '../../common/orderSummary/orderSummary';
import OrderForm from '../../common/orderForm/orderForm';

const OrderPage = () => {
  return (
    <div className={styles.orderPageContainer}>
      <OrderForm />
      <OrderSummary orderButton={false} />
    </div>
  );
};

export default OrderPage;
