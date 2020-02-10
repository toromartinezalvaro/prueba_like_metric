export const FETCH_ADD_TO_TOWER__START = 1;
export const FETCH_ADD_TO_TOWER__SUCCESS = 2;
export const FETCH_ADD_TO_TOWER__FAILURE = 3;
export const RESTART_STATE = 4;
export const CLIENT_REQUEST__START = 5;
export const CLIENT_REQUEST__SUCCESS = 6;
export const CLIENT_REQUEST__FAILURE = 7;
export const CREATED_CLIENT = 8;

export const fetchAddToTowerStart = () => ({
  type: FETCH_ADD_TO_TOWER__START,
});

export const fetchAddToTowerSuccess = () => ({
  type: FETCH_ADD_TO_TOWER__SUCCESS,
});

export const fetchAddToTowerFailure = () => ({
  type: FETCH_ADD_TO_TOWER__FAILURE,
});

export const restartState = () => ({
  type: RESTART_STATE,
});

export const clientRequestStart = () => ({
  type: CLIENT_REQUEST__START,
});

export const clientRequestSuccess = () => ({
  type: CLIENT_REQUEST__SUCCESS,
});

export const clientRequestFailure = () => ({
  type: CLIENT_REQUEST__FAILURE,
});

export const createdClient = (id) => ({
  type: CREATED_CLIENT,
  payload: id,
});
