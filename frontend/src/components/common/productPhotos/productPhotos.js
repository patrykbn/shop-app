import React from 'react';
import styles from './productPhotos.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState, useCallback } from 'react';
import { loadProductImageRequest, getProductImagesByProductId } from '../../../redux/productImagesRedux';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

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
    dispatch(loadProductImageRequest());
  }, [dispatch]);

  return (
    <div className={styles.productPhotos}>
      <div className={styles.productImagesContainer}>
        <div className={`${styles.productActiveImage} ${fade ? styles.fade : ''}`}>
          <LazyLoadImage 
            key={activePhoto}
            sizes="(max-width: 300px) 100vw, 50vw"
            src={`../images/${productPhotos[activePhoto]?.imageUrl}`}
            alt='productphoto'
            className={styles.productPicture}
            width="400"
            height="400"
            loading="lazy" // Lazy load non-critical images
          >
          </LazyLoadImage>
        </div>
      </div>
      <div className={styles.imageLine}>
        {productPhotos.map((photo, index) => (
          <div 
            key={index} 
            className={`${styles.thumbnail} ${index === activePhoto ? styles.active : ''}`}
            onClick={() => handleThumbnailClick(index)}
          >
            <img src={`../images/${photo.imageUrl}`} alt={`thumbnail-${index}`} sizes="(max-width: 150px) 100vw, 50vw"/>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductPhotos;
