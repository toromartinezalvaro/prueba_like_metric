export const FETCH_AREAS__START = 1;
export const FETCH_AREAS__SUCCESS = 2;
export const FETCH_AREAS__FAILURE = 3;

export const fetchAreasStart = () => ({
  type: FETCH_AREAS__START,
});

export const fetchAreasSuccess = (areas) => ({
  type: FETCH_AREAS__SUCCESS,
  payload: areas,
});

export const fetchAreasFailure = () => ({
  type: FETCH_AREAS__FAILURE,
});
