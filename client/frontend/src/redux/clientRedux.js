import axios from 'axios';
import { API_URL } from '../config';
import initialState from './initialState';

// selectors

export const getClients = ({ clients }) => clients
export const getClientById = ({ clients }, clientId) => clients.find(client => client.id === clientId)
export const getClientByEmail = ({ clients }, clientEmail ) => clients.find(client => client.email === clientEmail)

// actions

// action name creator
const reducerName = 'clients';
const createActionName = name => `app/${reducerName}/${name}`;

const START_REQUEST = createActionName('START_REQUEST');
const END_REQUEST = createActionName('END_REQUEST');
const ERROR_REQUEST = createActionName('ERROR_REQUEST');

const LOAD_CLIENTS = createActionName('LOAD_CLIENTS');
const ADD_CLIENT = createActionName('ADD_CLIENT');

export const startRequest = () => ({ type: START_REQUEST });
export const endRequest = () => ({ type: END_REQUEST });
export const errorRequest = error => ({ error, type: ERROR_REQUEST });

export const loadClients = payload => ({ payload, type: LOAD_CLIENTS });
export const addClient = payload => ({ payload, type: ADD_CLIENT });

// thunks

export const addClientRequest = (client) => {
    return async dispatch => {
        dispatch(startRequest());
        try {
            let res = await axios.post(`${API_URL}/clients`, client);
            dispatch(addClient(res.data));
            dispatch(endRequest());
            return res.data;
        } catch (e) {
            dispatch(errorRequest(e.message));
        }
    };
}

export const findOrCreateClient = (client) => {
    return async (dispatch, getState) => {
        dispatch(startRequest());
        try {
            let res = await axios.get(`${API_URL}/clients`);
            const existingClient = res.data.find(c => c.email === client.email);
            if (existingClient) {
                dispatch(endRequest());
                return existingClient.id;
            } else {
                let res = await axios.post(`${API_URL}/clients`, client);
                dispatch(addClient(res.data));
                dispatch(endRequest());
                return res.data.id;
            }
        } catch (e) {
            dispatch(errorRequest(e.message));
        }
    };
}

export default function reducer(statePart = initialState.clients, action = {}) {
    switch (action.type) {
        case LOAD_CLIENTS:
            return {
                ...statePart,
                data: action.payload,
            };
        case ADD_CLIENT:
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