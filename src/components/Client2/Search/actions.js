export const FETCH_OPTIONS__START = 'FOST';
export const FETCH_OPTIONS__SUCCESS = 'FOSS';
export const FETCH_OPTIONS__FAILURE = 'FOF';

export const fetchOptionsStart = () => ({
  type: FETCH_OPTIONS__START,
});

export const fetchOptionsSuccess = (options, inputValue) => ({
  type: FETCH_OPTIONS__SUCCESS,
  payload: { options, inputValue },
});

export const fetchOptionsFailure = () => ({
  type: FETCH_OPTIONS__FAILURE,
});
