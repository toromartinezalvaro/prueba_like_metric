import { TOGGLE_SETTING__SHOW_NO_INCREMENT } from './actions';

const initialState = {
  showPricesWithoutIncrement: true,
};

export default (state = initialState, { type }) => {
  switch (type) {
    case TOGGLE_SETTING__SHOW_NO_INCREMENT:
      return {
        ...state,
        showPricesWithoutIncrement: !state.showPricesWithoutIncrement,
      };
    default:
      return state;
  }
};
