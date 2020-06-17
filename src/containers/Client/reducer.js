import _ from 'lodash';
import {
  FETCH_CLIENTS__START,
  FETCH_CLIENTS__SUCCESS,
  FETCH_CLIENTS__FAILURE,
  ADD_CLIENT__SUCCESS,
  CREATE_CLIENT__SUCCESS,
  UPDATE_CLIENT__SUCCESS,
  REMOVE_CLIENT,
} from './actions';

export const initialState = {
  list: [],
  isLoading: false,
  error: false,
};

const createClient = (clients, client) => {
  return [...clients, client];
};

const updateClient = (clients, client) => {
  const tempClients = [...clients];
  const clientIndex = _.findIndex(
    tempClients,
    (e) => e.identityDocument === client.identityDocument,
  );
  if (clientIndex !== -1) {
    tempClients[clientIndex] = client;
  }
  return tempClients;
};

const addClient = (clients, client) => {
  const tempClients = [...clients];
  if (!_.find(clients, (o) => o.id === client.id)) {
    tempClients.push(client);
  }
  return tempClients;
};

const deleteClient = (clients, client) => {
  return clients.filter((o) => o.id !== client);
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case FETCH_CLIENTS__START:
      return { ...state, isLoading: true };
    case FETCH_CLIENTS__SUCCESS:
      return { ...state, list: payload, isLoading: false };
    case FETCH_CLIENTS__FAILURE:
      return { ...state, isLoading: false, error: true };
    case CREATE_CLIENT__SUCCESS:
      return { ...state, list: createClient(state.list, payload) };
    case UPDATE_CLIENT__SUCCESS:
      return { ...state, list: updateClient(state.list, payload) };
    case ADD_CLIENT__SUCCESS:
      return { ...state, list: addClient(state.list, payload) };
    case REMOVE_CLIENT:
      return { ...state, list: deleteClient(state.list, payload) };
    default:
      return state;
  }
};

export default reducer;
