import React from 'react';
import styles from './productPhotos.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState, useCallback } from 'react';
import { loadProductImageRequest, getProductImagesByProductId } from '../../../redux/productImagesRedux';

const ProductPhotos = ({ productId }) => {
  const dispatch = useDispatch();
  const productPhotos = useSelector(state => getProductImagesByProductId(state, productId));
  const [activePhoto, setActivePhoto] = useState(0);
  const [fade, setFade] = useState(false);

  const handleThumbnailClick = useCallback((index) => {
    setFade(true);
    setTimeout(() => {
      setActivePhoto(index);
      setFade(false);
    }, 500);
  }, []);

  useEffect(() => {
    console.log('useEffect triggered');
    dispatch(loadProductImageRequest());
  }, [dispatch]);

  return (
    <div className={styles.productPhotos}>
      <div className={styles.productImagesContainer}>
        <div className={`${styles.productActiveImage} ${fade ? styles.fade : ''}`}>
          <img 
            key={activePhoto}
            src={`../images/${productPhotos[activePhoto]?.imageUrl}` || '../images/testMug.png'}
            alt='productphoto'
            className={styles.productPicture}>
          </img>
        </div>
      </div>
      <div className={styles.imageLine}>
        {productPhotos.map((photo, index) => (
          <div 
            key={index} 
            className={`${styles.thumbnail} ${index === activePhoto ? styles.active : ''}`}
            onClick={() => handleThumbnailClick(index)}
          >
            <img src={`../images/${photo.imageUrl}`} alt={`thumbnail-${index}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductPhotos;
