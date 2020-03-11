import {
  DATA_FETCH__START,
  DATA_FETCH__SUCCESS,
  DATA_FETCH__FAILURE,
  SELECT_REQUEST,
  CLOSE_MODAL,
} from './actions';

export const initialState = {
  loading: false,
  pending: [],
  resolved: [],
  modalOpen: false,
  selectedRequest: undefined,
  error: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case DATA_FETCH__START:
      return { ...state, loading: true };
    case DATA_FETCH__SUCCESS:
      return {
        ...state,
        pending: payload.pending,
        resolved: payload.resolved,
        loading: false,
        error: false,
      };
    case DATA_FETCH__FAILURE:
      return { ...state, loading: false, error: true };
    case SELECT_REQUEST:
      return { ...state, modalOpen: true, selectedRequest: payload };
    case CLOSE_MODAL:
      return { ...state, modalOpen: false, selectedRequest: undefined };
    default:
      return state;
  }
};
