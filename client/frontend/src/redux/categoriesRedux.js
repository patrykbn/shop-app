import axios from 'axios';
import { API_URL } from '../config';
import initialState from './initialState';

//selectors
export const getCategories = ({ categories }) => categories;
//actions

//action creators
const reducerName = 'categories';
const createActionName = name => `app/${reducerName}/${name}`;

const START_REQUEST = createActionName('START_REQUEST');
const END_REQUEST = createActionName('END_REQUEST');
const ERROR_REQUEST = createActionName('ERROR_REQUEST');

const LOAD_CATEGORIES = createActionName('LOAD_CATEGORIES');

export const startRequest = () => ({ type: START_REQUEST });
export const endRequest = () => ({ type: END_REQUEST });
export const errorRequest = error => ({ error, type: ERROR_REQUEST });

export const loadCategories = payload => ({ payload, type: LOAD_CATEGORIES });

//Thunks
export const loadCategoriesRequest = () => {
    return async dispatch => {
        dispatch(startRequest());
        try {
            let res = await axios.get(`${API_URL}/categories`);
            dispatch(loadCategories(res.data));
            dispatch(endRequest());
        } catch (e) {
            dispatch(errorRequest(e.message));
        }
    };
};

//Reducer

export default function reducer(statePart = initialState.categories, action = {}) {
    switch (action.type) {
        case LOAD_CATEGORIES:
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