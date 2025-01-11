import React from "react";
import styles from "./orderSummary.module.scss";
import { useDispatch,useSelector } from "react-redux";
import { useEffect } from "react";
import { loadProductsRequest } from "../../../redux/productsRedux";
import { getCart } from "../../../redux/cartRedux";
import ProductInSummary from "../productInSummary/productInSummary";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

const OrderSummary = ({ orderButton }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const cart = useSelector(getCart)

    const cartProducts = cart.products;

    useEffect(() => {
        dispatch(loadProductsRequest())
    }, [dispatch])

    const handleOrderFormClick = () => {
        navigate('/order');
    }

  return (
    <div className={styles.orderSummaryContainer}>
      <h2 className={styles.containerTitle}>Order Summary:</h2>
      <div className={styles.currentOrder}>
        <ul className={styles.currentOrderList}>
            {cartProducts.map(product => (
                <li key={product.id} className={styles.listElement}>
                <ProductInSummary productId={product.productId} quantity={product.quantity} option={product.option} comment={product.comment} orderItemId={product.id}/>
                </li>
            ))}
        </ul>
        <div className={`${styles.placeOrderButtonContainer} ${!orderButton ? styles.hidden : ''}`}>
            <div className={styles.placeOrderButton} onClick={handleOrderFormClick}>
                <FontAwesomeIcon icon={faEnvelope} className={styles.orderIcon} />
                <span className={styles.orderButtonText}>place order</span>
            </div>
        </div>
        <div className={styles.orderTotalContainer}>
            <div className={styles.orderTotalPrice}>
                <span className={styles.orderTotalPriceText}>${cart.totalCost}</span>
                <span className={styles.orderShippingText}>+shipping</span>
            </div>
            <div className={styles.orderTotalItems}>
                <span className={styles.orderTotalItemsText}>currently {cart.itemsInCart} items in order</span>
                <span className={styles.orderTotalText}>:YOUR TOTAL</span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;