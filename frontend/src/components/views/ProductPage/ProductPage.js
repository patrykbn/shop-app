import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './ProductPage.module.scss';
import { useParams, useNavigate } from 'react-router-dom';
import { loadProductsRequest, getProductById } from '../../../redux/productsRedux';
import ProductPhotos from '../../common/productPhotos/productPhotos';
import AddToCart from '../../common/addToCart/addToCart';

const ProductPage = () => {
  const { id } = useParams();
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const product = useSelector(state => getProductById(state, id));
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    dispatch(loadProductsRequest());
  }, [dispatch]);

  useEffect(() => {
    if (product && product.options.length > 0) {
      setSelectedOption(product.options[0]);
    }
  }, [product]);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.productPage}>
      <div className={styles.productContainer}>
        <div className={styles.productPhotos}>
          <ProductPhotos productId={id}/>
        </div>
        <div className={styles.productInfoContainer}>
          <div className={styles.productInfo}>
            <div className={styles.productTitle}>
              <h1 className={styles.productName}>
                {product.name}
                <span className={styles.productPrice}>${product.price}</span>
              </h1>
              <h3 className={styles.productShortDescription}>{product.shortDescription}</h3>
            </div>
            <div className={styles.productOptions}>
              {product.options.length > 0 ? (
                product.options.map((option, index) => (
                  <div
                    key={index}
                    className={`${styles.option} ${selectedOption === option ? styles.activeOption : ''}`}
                    onClick={() => handleOptionChange(option)}
                  >
                    {option}
                  </div>
                ))
              ) : (
                <span>No selectable options for this product</span>
              )}
            </div>
            <div className={styles.productDescription}>
              <span className={styles.productDescriptionText}>{product.description}</span>
            </div>
            <div className={styles.productCartContainer}>
              <AddToCart productPrice={product.price} productId={product.id} selectedOption={selectedOption} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
