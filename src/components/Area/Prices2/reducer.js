import {
  FETCH_AREAS__START,
  FETCH_AREAS__SUCCESS,
  FETCH_AREAS__FAILURE,
} from './actions';

export const initialState = {
  areaType: {
    id: null,
    name: '',
    unit: '',
    areas: [],
  },
  loading: false,
  error: false,
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case FETCH_AREAS__START:
      return { ...state, loading: true };
    case FETCH_AREAS__SUCCESS:
      return { ...state, areaType: payload, loading: false };
    case FETCH_AREAS__FAILURE:
      return { ...state, error: true, loading: false };
    default:
      return state;
  }
};

export default reducer;
