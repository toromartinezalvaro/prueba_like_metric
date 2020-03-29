import { TOGGLE_SETTING__SHOW_NO_INCREMENT, CHANGE_GROUP } from './actions';

const initialState = {
  showPricesWithoutIncrement: false,
  selectedGroup: 1,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case TOGGLE_SETTING__SHOW_NO_INCREMENT:
      return {
        ...state,
        showPricesWithoutIncrement: !state.showPricesWithoutIncrement,
      };
    case CHANGE_GROUP:
      return { ...state, selectedGroup: payload };
    default:
      return state;
  }
};
