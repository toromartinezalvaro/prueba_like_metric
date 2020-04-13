import { LOADING_START, LOADING_STOP } from './actions';

const initialState = {
  loading: false,
};

export default (state = initialState, { type }) => {
  switch (type) {
    case LOADING_START:
      return { ...state, loading: true };
    case LOADING_STOP:
      return { ...state, loading: false };
    default:
      return state;
  }
};
