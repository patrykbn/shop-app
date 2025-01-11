import axios from 'axios';
import { API_URL } from '../config';
import initialState from './initialState';

// selectors
export const getProductImageById = ({ productImages }, imageId) => productImages.data.find(image => image.id === imageId);
export const getProductImagesByProductId = ({ productImages }, productId) => productImages.data.filter(image => image.productId === productId);

// actions
const reducerName = 'productImages';
const createActionName = name => `app/${reducerName}/${name}`;

const START_REQUEST = createActionName('START_REQUEST');
const END_REQUEST = createActionName('END_REQUEST');
const ERROR_REQUEST = createActionName('ERROR_REQUEST');

const LOAD_PRODUCT_IMAGE = createActionName('LOAD_PRODUCT_IMAGE');

export const startRequest = () => ({ type: START_REQUEST });
export const endRequest = () => ({ type: END_REQUEST });
export const errorRequest = error => ({ error, type: ERROR_REQUEST });

export const loadProductImage = payload => ({ payload, type: LOAD_PRODUCT_IMAGE });

// thunks
export const loadProductImageRequest = () => {
    return async dispatch => {
        dispatch(startRequest());
        try {
            let res = await axios.get(`${API_URL}/product-images`);
            dispatch(loadProductImage(res.data));
            dispatch(endRequest());
        } catch (e) {
            dispatch(errorRequest(e.message));
        }
    };
}

export default function reducer(statePart = initialState.productImages, action = {}) {
    switch (action.type) {
        case LOAD_PRODUCT_IMAGE:
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
