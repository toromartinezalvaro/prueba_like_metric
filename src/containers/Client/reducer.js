import {
  FETCH_CLIENTS__START,
  FETCH_CLIENTS__SUCCESS,
  FETCH_CLIENTS__FAILURE,
} from './actions';

export const initialState = {
  list: [],
  isLoading: false,
  error: false,
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
    default:
      return state;
  }
};

export default reducer;
