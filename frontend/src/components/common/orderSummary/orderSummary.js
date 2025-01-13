import React, { useState } from "react";
import styles from "./orderSummary.module.scss";
import { useDispatch,useSelector } from "react-redux";
import { useEffect } from "react";
import { loadProductsRequest } from "../../../redux/productsRedux";
import { clearCart, getCart } from "../../../redux/cartRedux";
import ProductInSummary from "../productInSummary/productInSummary";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

const OrderSummary = ({ orderButton }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const cart = useSelector(getCart)
    const [hidden, setHidden] = useState(false);

    const cartProducts = cart.products;

    useEffect(() => {
        dispatch(loadProductsRequest())
    }, [dispatch])

    const handleOrderFormClick = () => {
        navigate('/order');
    }

    const handleSummaryHide = () => {
        if (hidden) {
            setHidden(false);
        } else {
            setHidden(true);
        }
    }

    const handleClearCart = () => {
        if (window.confirm("Are you sure you want to clear the cart?")) {
            dispatch(clearCart());
        }
    }

  return (
    <div className={styles.orderSummaryContainer}>
      <div className={styles.currentOrderTopBar}>
        {!hidden ? (
            <span className={styles.hide} onClick={handleSummaryHide}>Hide</span>
        ):(
            <span className={styles.show} onClick={handleSummaryHide}>Show</span>
        )}
        <span className={styles.containerTitle}>:Order Summary</span>
      </div>
      <div className={`${styles.currentOrder} ${hidden ? styles.hidden : ''}`}>
        <ul className={styles.currentOrderList}>
            {cartProducts.map(product => (
                <li key={product.id} className={styles.listElement}>
                <ProductInSummary productId={product.productId} quantity={product.quantity} option={product.option} comment={product.comment} orderItemId={product.id}/>
                </li>
            ))}
        </ul>
        <div className={`${styles.placeOrderButtonContainer} ${!orderButton ? styles.hidden : ''}`}>
            <div className={`${styles.placeOrderButton} ${cart.itemsInCart < 1 ? styles.hidden : ''}`} onClick={handleOrderFormClick}>
                <FontAwesomeIcon icon={faEnvelope} className={styles.orderIcon} />
                <span className={styles.orderButtonText}>place order</span>
            </div>
            <div className={`${styles.noItems} ${cart.itemsInCart > 0 ? styles.hidden : ''}`}>
                <span className={styles.noItemsText}>Add items to your cart to place order</span>
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
      <div className={`${styles.itemsInCart} ${!hidden ? styles.hidden : ''}`}>
        
        <span className={styles.itemsInCartText}>you currently have {cart.itemsInCart} items in your cart</span>
        <span className={styles.itemsInCartTextTwo} onClick={handleSummaryHide}>show order summary to place order</span>
      </div>
      <div className={styles.clearCartButton} onClick={handleClearCart}>Clear cart content</div>
    </div>
  );
};

export default OrderSummary;