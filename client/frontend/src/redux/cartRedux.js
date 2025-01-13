import initialState from './initialState';

// cartRedux.js

// selectors
export const getCart = ({ cart }) => cart;
export const getCartProductById = ({ cart }, productId) => cart.products.find(product => product.id === productId);

// action name creator
const reducerName = 'cart';
const createActionName = name => `app/${reducerName}/${name}`;

const ADD_TO_CART = createActionName('ADD_TO_CART');
const REMOVE_FROM_CART = createActionName('REMOVE_FROM_CART');
const UPDATE_CART_QUANTITY = createActionName('UPDATE_CART_QUANTITY');
const LOAD_CART = createActionName('LOAD_CART');
const CLEAR_CART = createActionName('CLEAR_CART');
const UPDATE_PRODUCT_COMMENT = createActionName('UPDATE_PRODUCT_COMMENT');
const UPDATE_PRODUCT_QUANTITY = createActionName('UPDATE_PRODUCT_QUANTITY');

// actions
export const addToCart = payload => ({ payload, type: ADD_TO_CART });
export const removeFromCart = payload => ({ payload, type: REMOVE_FROM_CART });
export const updateCartQuantity = payload => ({ payload, type: UPDATE_CART_QUANTITY });
export const loadCart = payload => ({ payload, type: LOAD_CART });
export const clearCart = () => ({ type: CLEAR_CART });
export const updateProductComment = payload => ({ payload, type: UPDATE_PRODUCT_COMMENT });
export const updateProductQuantity = payload => ({ payload, type: UPDATE_PRODUCT_QUANTITY});

// thunks
export const loadCartFromLocalStorage = () => {
    return dispatch => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        dispatch(loadCart(cart));
    };
};

export const saveCartToLocalStorage = () => {
    return (dispatch, getState) => {
        const { products, itemsInCart, totalCost } = getState().cart;
        const cart = { products, itemsInCart, totalCost };
        localStorage.setItem('cart', JSON.stringify(cart));
    };
};

// reducer
export default function reducer(statePart = initialState.cart, action = {}) {
    switch (action.type) {
        case ADD_TO_CART:
            return {
                ...statePart,
                products: [...statePart.products, action.payload],
                itemsInCart: statePart.itemsInCart + action.payload.quantity,
                totalCost: statePart.totalCost + action.payload.totalPrice
            };
        case REMOVE_FROM_CART:
            const removedProduct = statePart.products.find(product => product.id === action.payload.id);
            if (!removedProduct) return statePart;
            return {
                ...statePart,
                products: statePart.products.filter(product => product.id !== action.payload.id),
                itemsInCart: statePart.itemsInCart - removedProduct.quantity,
                totalCost: statePart.totalCost - removedProduct.totalPrice
            };
        case UPDATE_CART_QUANTITY:
            return {
                ...statePart,
                products: statePart.products.map(product =>
                    product.id === action.payload.id
                        ? { ...product, quantity: action.payload.quantity, totalPrice: action.payload.quantity * product.basePrice }
                        : product
                ),
                itemsInCart: statePart.products.reduce((total, product) => total + (product.id === action.payload.id ? action.payload.quantity : product.quantity), 0),
                totalCost: statePart.products.reduce((total, product) => total + (product.id === action.payload.id ? action.payload.quantity * product.basePrice : product.totalPrice), 0)
            };
        case LOAD_CART:
            return {
                ...statePart,
                products: action.payload.products || [],
                itemsInCart: action.payload.itemsInCart || 0,
                totalCost: action.payload.totalCost || 0
            };
        case CLEAR_CART:
            return {
                ...statePart,
                products: [],
                itemsInCart: 0,
                totalCost: 0
            };
        case UPDATE_PRODUCT_COMMENT:
            return {
                ...statePart,
                products: statePart.products.map(product =>
                    product.id === action.payload.id
                        ? { ...product, comment: action.payload.comment }
                        : product
                )
            };
        case UPDATE_PRODUCT_QUANTITY:
            return {
                ...statePart,
                products: statePart.products.map(product =>
                    product.id === action.payload.id
                        ? { ...product, quantity: action.payload.quantity, totalPrice: action.payload.quantity * product.basePrice }
                        : product
                ),
                itemsInCart: statePart.products.reduce((total, product) => total + (product.id === action.payload.id ? action.payload.quantity : product.quantity), 0),
                totalCost: statePart.products.reduce((total, product) => total + (product.id === action.payload.id ? action.payload.quantity * product.basePrice : product.totalPrice), 0)
            };
        default:
            return statePart;
    }
}