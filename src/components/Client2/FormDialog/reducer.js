import {
  FETCH_ADD_TO_TOWER__START,
  FETCH_ADD_TO_TOWER__SUCCESS,
  FETCH_ADD_TO_TOWER__FAILURE,
  RESTART_STATE,
} from './actions';

export const initialState = {
  loading: false,
  success: false,
  error: false,
};

const reducer = (state = initialState, action) => {
  const { type } = action;

  switch (type) {
    case FETCH_ADD_TO_TOWER__START:
      return { ...state, loading: true };
    case FETCH_ADD_TO_TOWER__SUCCESS:
      return { ...state, loading: false, success: true };
    case FETCH_ADD_TO_TOWER__FAILURE:
      return { ...state, loading: false, error: true };
    case RESTART_STATE:
      return { ...initialState };
    default:
      return state;
  }
};

export default reducer;
