import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import MainLayout from './components/layout/MainLayout/MainLayout';
import HomePage from './components/views/HomePage/HomePage';
import ProductPage from './components/views/ProductPage/ProductPage';
import CartPage from './components/views/CartPage/CartPage';
import OrderPage from './components/views/OrderPage/OrderPage';
import NotFound from './components/views/NotFound/NotFound';

import { loadCartFromLocalStorage, saveCartToLocalStorage } from './redux/cartRedux';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadCartFromLocalStorage());
    const handleBeforeUnload = () => {
      dispatch(saveCartToLocalStorage());
      if (window.websocket) {
        window.websocket.close();
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [dispatch]);

  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </MainLayout>
  );
};

export default App;