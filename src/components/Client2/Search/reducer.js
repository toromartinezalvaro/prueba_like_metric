import {
  FETCH_OPTIONS__START,
  FETCH_OPTIONS__SUCCESS,
  FETCH_OPTIONS__FAILURE,
} from './actions';

export const initialState = {
  list: [],
  isLoading: false,
  error: false,
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case FETCH_OPTIONS__START:
      return { ...state, list: [], isLoading: true };
    case FETCH_OPTIONS__SUCCESS:
      return {
        ...state,
        list: [
          ...payload.options,
          {
            id: null,
            name: 'Crear cliente',
            identityDocument: payload.inputValue,
          },
        ],
        isLoading: false,
      };
    case FETCH_OPTIONS__FAILURE:
      return { ...state, isLoading: false, error: true };
    default:
      return state;
  }
};

export default reducer;
