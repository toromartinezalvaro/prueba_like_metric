export const DATA_FETCH__START = 1;
export const DATA_FETCH__SUCCESS = 2;
export const DATA_FETCH__FAILURE = 3;
export const SELECT_REQUEST = 4;
export const CLOSE_MODAL = 5;

export const startFetchData = () => ({ type: DATA_FETCH__START });
export const succeededDataFetch = (data) => ({
  type: DATA_FETCH__SUCCESS,
  payload: data,
});
export const failedDataFetch = () => ({ type: DATA_FETCH__FAILURE });
export const requestSelection = () => ({ type: SELECT_REQUEST });
export const closeModal = () => ({ type: CLOSE_MODAL });
