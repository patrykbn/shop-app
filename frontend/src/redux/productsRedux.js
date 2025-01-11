import axios from 'axios';
import { API_URL } from '../config';
import initialState from './initialState';

// selectors
export const getAllProducts = ({ products }) => products.data;
export const getProductByCategory = ({ products }, categoryId) => products.data.filter(product => product.categoryId === categoryId);
export const getProductById = ({ products }, productId) => products.data.find(product => product.id === productId);
export const getProductInCartById = ({ products }, productId) => {
    const product = products.data.find(product => product.id === productId);
    return product ? {
        name: product.name,
        price: product.price,
        shortDescription: product.shortDescription,
        imgMain: product.imgMain,
    } : null;
};

// actions
const reducerName = 'products';
const createActionName = name => `app/${reducerName}/${name}`;

const START_REQUEST = createActionName('START_REQUEST');
const END_REQUEST = createActionName('END_REQUEST');
const ERROR_REQUEST = createActionName('ERROR_REQUEST');

const LOAD_PRODUCTS = createActionName('LOAD_PRODUCTS');

export const startRequest = () => ({ type: START_REQUEST });
export const endRequest = () => ({ type: END_REQUEST });
export const errorRequest = error => ({ error, type: ERROR_REQUEST });

export const loadProducts = payload => ({ payload, type: LOAD_PRODUCTS });

// thunks
export const loadProductsRequest = () => {
    return async dispatch => {
        dispatch(startRequest());
        try {
            let res = await axios.get(`${API_URL}/products`);
            dispatch(loadProducts(res.data));
            dispatch(endRequest());
        } catch (e) {
            dispatch(errorRequest(e.message));
        }
    };
}

export default function reducer(statePart = initialState.products, action = {}) {
    switch (action.type) {
        case LOAD_PRODUCTS:
            return {
                ...statePart,
                data: action.payload,
            };
        case START_REQUEST:
            return {
                ...statePart,
                request: { pending: true, error: null, success: false },
            };
        case END_REQUEST:
            return {
                ...statePart,
                request: { pending: false, error: null, success: true },
            };
        case ERROR_REQUEST:
            return {
                ...statePart,
                request: { pending: false, error: action.error, success: false },
            };
        default:
            return statePart;
    }
}