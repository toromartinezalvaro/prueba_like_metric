import { TOGGLE_PRICES, CHANGE_VIEW } from './actions';

export const MAIN_VIEW = 'main';
export const DETAILS_VIEW = 'details';

export const initialState = {
  settings: {
    prices: {
      withoutIncrements: false,
    },
  },
  view: MAIN_VIEW,
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case TOGGLE_PRICES:
      return {
        ...state,
        settings: {
          prices: {
            withoutIncrements: !state.settings.prices.withoutIncrements,
          },
        },
      };
    case CHANGE_VIEW:
      return { ...state, view: payload };
    default:
      return state;
  }
};

export default reducer;
