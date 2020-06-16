export const FETCH_CLIENTS__START = 'FCST';
export const FETCH_CLIENTS__SUCCESS = 'FCSS';
export const FETCH_CLIENTS__FAILURE = 'FCF';
export const CREATE_CLIENT__SUCCESS = 'CDS';
export const UPDATE_CLIENT__SUCCESS = 'UDS';
export const ADD_CLIENT__SUCCESS = 'ADS';
export const REMOVE_CLIENT = 'RMV';

export const removeClient = (clientId) => ({
  type: REMOVE_CLIENT,
  payload: clientId,
});

export const fetchClientsStart = () => ({
  type: FETCH_CLIENTS__START,
});

export const fetchClientsSuccess = (clients) => ({
  type: FETCH_CLIENTS__SUCCESS,
  payload: clients,
});

export const fetchClientsFailure = () => ({
  type: FETCH_CLIENTS__FAILURE,
});

export const createClient = (client) => ({
  type: CREATE_CLIENT__SUCCESS,
  payload: client,
});

export const updateClient = (client) => ({
  type: UPDATE_CLIENT__SUCCESS,
  payload: client,
});

export const addClient = (client) => ({
  type: ADD_CLIENT__SUCCESS,
  payload: client,
});
