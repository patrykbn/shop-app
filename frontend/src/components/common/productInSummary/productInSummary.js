import React , { useEffect, useState } from "react";
import styles from './productInSummary.module.scss';
import { useDispatch, useSelector } from "react-redux";
import { loadProductsRequest, getProductById } from "../../../redux/productsRedux";

const ProductInSummary = ({ productId, quantity, option, comment, orderItemId}) => {
    const dispatch = useDispatch();
    const [expanded, setExpanded] = useState(false)

    const product = useSelector(state => getProductById(state, productId));

    useEffect(() => {
        dispatch(loadProductsRequest())
    }, [dispatch])
    
    if(!product) return( null )
    
    const totaCost = quantity * product.price

    const handleExpand= () => {
        if(expanded) {
            setExpanded(false)
        } else {
            setExpanded(true)
        }
    }

    return(
            <div className={`${styles.elementContainer} ${expanded ? styles.expanded : ''}`}>
                <div className={styles.mainInformation}>
                    <div className={styles.mainText}>
                    <span className={styles.productName}>{product.name}</span>
                    <span className={styles.productOption}>{option}</span>
                    </div>
                    <div className={styles.mainPrice}>
                        <span className={styles.mainPriceText}>{totaCost}</span>$
                    </div>
                </div>
                <div className={`${styles.expandedContainer} ${expanded ? styles.show : ''}`}>
                    <span className={styles.detailTitle}>about product:</span>
                    <span className={styles.detailDescription}>{product.shortDescription}</span>
                    <span className={styles.detailTitle}>your comment:</span>
                    <span className={styles.detailComment}>{comment}</span>
                </div>
                <div className={styles.expandButton} onClick={handleExpand}>
                    {expanded ? ('show less'):('show more')}
                </div>
            </div>
    )
}

export default ProductInSummary;