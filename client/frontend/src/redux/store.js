import { configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';
import initialState from "./initialState";
import categoriesReducer from './categoriesRedux';
import productsReducer from './productsRedux';
import cartReducer from './cartRedux';
import ordersReducer from './orderRedux';
import clientsReducer from './clientRedux';
import productImagesReducer from './productImagesRedux';

// Load cart from local storage
const loadCartFromLocalStorage = () => {
    try {
        const serializedCart = localStorage.getItem('cart');
        if (serializedCart === null) {
            return initialState.cart;
        }
        return JSON.parse(serializedCart);
    } catch (e) {
        console.warn("Could not load cart from local storage", e);
        return initialState.cart;
    }
};

const preloadedState = {
    ...initialState,
    cart: loadCartFromLocalStorage(),
};

const store = configureStore({
    reducer: {
        categories: categoriesReducer,
        products: productsReducer,
        cart: cartReducer,
        orders: ordersReducer,
        clients: clientsReducer,
        productImages: productImagesReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
    preloadedState
});

// Save cart to local storage on state change
store.subscribe(() => {
    try {
        const serializedCart = JSON.stringify(store.getState().cart);
        localStorage.setItem('cart', serializedCart);
    } catch (e) {
        console.warn("Could not save cart to local storage", e);
    }
});

export default store;