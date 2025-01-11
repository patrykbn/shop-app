import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadProductsRequest, getProductByCategory } from '../../../redux/productsRedux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

import styles from './productsInCategory.module.scss';

const ProductsInCategory = ({ categoryId }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const products = useSelector(state => getProductByCategory(state, categoryId));
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [fade, setFade] = useState(false);

    useEffect(() => {
        dispatch(loadProductsRequest());
    }, [dispatch]);

    useEffect(() => {
        if (isPaused) return;

        const interval = setInterval(() => {
            setFade(true);
            setTimeout(() => {
                setCurrentIndex(prevIndex => (prevIndex + 1) % products.length);
                setFade(false);
            }, 500);
        }, 5000);

        return () => clearInterval(interval);
    }, [isPaused, products.length]);

    const handleProductClick = () => {
        navigate(`/product/${products[currentIndex].id}`);
    }

    const handleNextProduct = () => {
        setFade(true);
        setTimeout(() => {
            setCurrentIndex((currentIndex + 1) % products.length);
            setFade(false);
        }, 500);
        setIsPaused(true);
        setTimeout(() => setIsPaused(false), 20000);
    };

    const handlePreviousProduct = () => {
        setFade(true);
        setTimeout(() => {
            setCurrentIndex((currentIndex - 1 + products.length) % products.length);
            setFade(false);
        }, 500);
        setIsPaused(true);
        setTimeout(() => setIsPaused(false), 20000);
    };
    //<span>{products[currentIndex].shortDescription}</span>
    return (
        <div className={styles.productsInCategory}>
            {products.length > 0 && (
                <div className={`${styles.product} ${fade ? styles.fade : ''}`}>
                    <span className={styles.productName}>{products[currentIndex].name}</span>
                    <img 
                        src={`/images/${products[currentIndex].imgMain}`}
                        alt='productphoto'
                        className={styles.productPicture}
                        onClick={handleProductClick}>
                    </img>
                    <div className={styles.productNav}>
                        <div className={styles.productNavButton} onClick={handlePreviousProduct}>
                            <FontAwesomeIcon icon={faArrowLeft} className={styles.arrowIconLeft} />
                        </div>
                        <div className={styles.productNavButton} onClick={handleNextProduct}>
                            <FontAwesomeIcon icon={faArrowRight} className={styles.arrowIconRight} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductsInCategory;
