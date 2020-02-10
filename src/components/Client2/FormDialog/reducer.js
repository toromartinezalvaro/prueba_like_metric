import {
  FETCH_ADD_TO_TOWER__START,
  FETCH_ADD_TO_TOWER__SUCCESS,
  FETCH_ADD_TO_TOWER__FAILURE,
  RESTART_STATE,
  CLIENT_REQUEST__START,
  CLIENT_REQUEST__SUCCESS,
  CLIENT_REQUEST__FAILURE,
  CREATED_CLIENT,
} from './actions';

export const initialState = {
  loading: false,
  clientRequestLoading: false,
  createdClient: false,
  success: false,
  error: false,
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_ADD_TO_TOWER__START:
      return { ...state, loading: true };
    case FETCH_ADD_TO_TOWER__SUCCESS:
      return { ...state, loading: false, success: true };
    case FETCH_ADD_TO_TOWER__FAILURE:
      return { ...state, loading: false, error: true };
    case RESTART_STATE:
      return { ...initialState };
    case CLIENT_REQUEST__START:
      return { ...state, clientRequestLoading: true };
    case CLIENT_REQUEST__SUCCESS:
      return { ...state, clientRequestLoading: false };
    case CLIENT_REQUEST__FAILURE:
      return { ...state, clientRequestLoading: false };
    case CREATED_CLIENT:
      return { ...state, createdClient: payload };
    default:
      return state;
  }
};

export default reducer;
