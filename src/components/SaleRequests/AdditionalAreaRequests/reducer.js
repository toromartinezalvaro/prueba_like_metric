import {
  DATA_FETCH__START,
  DATA_FETCH__SUCCESS,
  DATA_FETCH__FAILURE,
  SELECT_REQUEST,
  CLOSE_MODAL,
  RESOLVE_REQUEST,
} from './actions';

export const initialState = {
  loading: false,
  pending: [],
  resolved: [],
  modalOpen: false,
  selectedRequest: undefined,
  error: false,
};

const removeItemFromArray = (id, array) => {
  return array.filter((element) => element.id !== id);
};

const moveItem = (id, from, to) => {
  const item = from.find((element) => element.id === id);
  const tempArray = [...to, item];
  return tempArray;
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
    case RESOLVE_REQUEST:
      return {
        ...state,
        resolved: moveItem(payload, state.pending, state.resolved),
        pending: removeItemFromArray(payload, state.pending),
        modalOpen: false,
        selectedRequest: undefined,
      };
    default:
      return state;
  }
};
