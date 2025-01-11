import axios from 'axios';
import { API_URL } from '../config';
import initialState from './initialState';

//selectors
//selectors created for future use
//no implementation yet

//export const getOrders = ({ orders }) => orders
//export const getOrderByClient = ({ orders }, clientId) => orders.filter(order => order.clientId === clientId)

//actions

//action name creator
const reducerName = 'orders';
const createActionName = name => `app/${reducerName}/${name}`;

const START_REQUEST = createActionName('START_REQUEST');
const END_REQUEST = createActionName('END_REQUEST');
const ERROR_REQUEST = createActionName('ERROR_REQUEST');

//const LOAD_ORDERS = createActionName('LOAD_ORDERS');
const ADD_ORDER = createActionName('ADD_ORDER');

export const startRequest = () => ({ type: START_REQUEST });
export const endRequest = () => ({ type: END_REQUEST });
export const errorRequest = error => ({ error, type: ERROR_REQUEST });

export const addOrder = payload => ({ payload, type: ADD_ORDER });



//thunks

/*
export const loadOrdersRequest = () => {
  return async dispatch => {
    dispatch(startRequest());
    try {
      let res = await axios.get(`${API_URL}/orders`);
      dispatch(addOrder(res.data));
      dispatch(endRequest());
    } catch (e) {
      dispatch(errorRequest(e.message));
    }
  };
}
*/
/*
export const loadOrdersByClientRequest = (clientId) => {
  return async dispatch => {
    dispatch(startRequest());
    try {
      let res = await axios.get(`${API_URL}/orders/${clientId}`);
      dispatch(addOrder(res.data));
      dispatch(endRequest());
    } catch (e) {
      dispatch(errorRequest(e.message));
    }
  };
}
*/

export const addOrderRequest = (order) => {
  return async dispatch => {
    dispatch(startRequest());
    try {
      let res = await axios.post(`${API_URL}/orders`, order);
      dispatch(addOrder(res.data));
      dispatch(endRequest());
    } catch (e) {
      dispatch(errorRequest(e.message));
    }
  };
}

export default function reducer(statePart = initialState.orders, action = {}) {
  switch (action.type) {
    case ADD_ORDER:
      return {
        ...statePart,
        data: [...statePart.data, action.payload],
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