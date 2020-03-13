export const DATA_FETCH__START = 1;
export const DATA_FETCH__SUCCESS = 2;
export const DATA_FETCH__FAILURE = 3;
export const SELECT_REQUEST = 4;
export const CLOSE_MODAL = 5;
export const RESOLVE_REQUEST = 6;

export const startFetchData = () => ({ type: DATA_FETCH__START });
export const succeededDataFetch = (data) => ({
  type: DATA_FETCH__SUCCESS,
  payload: data,
});
export const failedDataFetch = () => ({ type: DATA_FETCH__FAILURE });
export const requestSelection = (request) => ({
  type: SELECT_REQUEST,
  payload: request,
});
export const closeModal = () => ({ type: CLOSE_MODAL });
export const resolveRequest = (id) => ({ type: RESOLVE_REQUEST, payload: id });
