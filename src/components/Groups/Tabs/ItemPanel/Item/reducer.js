import {
  SET_CURRENT_ITEM,
  SET_INDEX,
  SET_ITEMS_FILTERED,

} from './action';

const initialState = {
  currentItem: {},
  index: null,
  itemsFiltered: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_CURRENT_ITEM:
      return { ...state, currentItem: payload };
    case SET_INDEX:
      return { ...state, index: payload };
    case SET_ITEMS_FILTERED:
      return { ...state, itemsFiltered: payload };
    default:
      return state;
  }
};
