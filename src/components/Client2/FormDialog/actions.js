export const FETCH_ADD_TO_TOWER__START = 1;
export const FETCH_ADD_TO_TOWER__SUCCESS = 2;
export const FETCH_ADD_TO_TOWER__FAILURE = 3;
export const RESTART_STATE = 4;

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
