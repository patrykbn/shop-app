import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadCategoriesRequest, getCategories } from '../../../redux/categoriesRedux';
import { loadProductsRequest } from '../../../redux/productsRedux';
import ProductsInCategory from '../../common/productsInCategory/productsInCategory';
import styles from './HomePage.module.scss';

const HomePage = () => {
  const dispatch = useDispatch();
  const categories = useSelector(getCategories);

  useEffect(() => {
    dispatch(loadCategoriesRequest());
    dispatch(loadProductsRequest());
  }, [dispatch]);

  const leftColumnCategories = categories.data ? categories.data.filter((_, index) => index % 2 === 0) : [];
  const rightColumnCategories = categories.data ? categories.data.filter((_, index) => index % 2 !== 0) : [];

  return (
    <div className={styles.homePage}>
      <div className={styles.columnLeft}>
        {leftColumnCategories.map(category => (
          <div key={category.id} className={styles.category}>
            <div className={styles.categoryName}>
              <div className={styles.categoryNameText}>{category.name}s</div>
            </div>
            <ProductsInCategory categoryId={category.id} />
          </div>
        ))}
      </div>
      <div className={styles.columnRight}>
        {rightColumnCategories.map(category => (
          <div key={category.id} className={styles.category}>
            <div className={styles.categoryName}>
              <div className={styles.categoryNameText}>{category.name}s</div>
            </div>
            <ProductsInCategory categoryId={category.id} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
