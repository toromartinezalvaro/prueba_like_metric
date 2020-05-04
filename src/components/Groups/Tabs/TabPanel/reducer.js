import {
  GROUPS_FETCH_API_START,
  GROUPS_FETCH_API_SUCCESS,
  GROUPS_FETCH_API_FAIL,
} from './action';

const initialState = {
  loading: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GROUPS_FETCH_API_START:
      return { ...state, loading: true };
    case GROUPS_FETCH_API_SUCCESS:
      return { ...state, loading: false, error: false };
    case GROUPS_FETCH_API_FAIL:
      return { ...state, loading: false, error: true };
    default:
      return state;
  }
};
