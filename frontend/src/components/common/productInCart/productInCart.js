import React from "react";
import styles from "./productInCart.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loadProductsRequest, getProductInCartById } from "../../../redux/productsRedux";

const ProductInCart = ({ productId, productOption, productTotalPrice}) => {
  const dispatch = useDispatch();
  const product = useSelector(state => getProductInCartById(state, productId));

  useEffect(() => {
    dispatch(loadProductsRequest());
  }, [dispatch]);

  if (!product) {
    return <div className={styles.productInCart}>Product not found</div>;
  }

  return (
    <div className={styles.productInCart}>
        <img src={`../images/${product.imgMain}`} alt='productphoto' />
        <div className={styles.productDetails}>
            <div className={styles.productTopDetails}>
                <span className={styles.productName}>
                    {product.name}
                    <span className={styles.productPrice}>${product.price}</span>
                </span>
            </div>
            <div className={styles.productShortDescription}>
                <span className={styles.productShortDescriptionText}>
                    {product.shortDescription}
                </span>
            </div>
            <div className={styles.productOption}>
                <span className={styles.productOptionText}>
                    option: <span className={styles.productOptionTextTwo}>{productOption}</span>
                </span>
            </div>
            <div className={styles.productOption}>
                <span className={styles.productOptionText}>
                    total: <span className={styles.productOptionTextTwo}>${productTotalPrice}</span>
                </span>
            </div>
        </div>
    </div>
  );
}

export default ProductInCart;