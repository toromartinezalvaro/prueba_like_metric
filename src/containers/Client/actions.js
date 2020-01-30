export const FETCH_CLIENTS__START = 'FCST';
export const FETCH_CLIENTS__SUCCESS = 'FCSS';
export const FETCH_CLIENTS__FAILURE = 'FCF';
export const SAVE = 'S';
export const ADD = 'A';

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
