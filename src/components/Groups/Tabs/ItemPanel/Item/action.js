export const SET_CURRENT_ITEM = 'SET_CURRENT_ITEM';
export const SET_INDEX = 'SET_INDEX';
export const SET_ITEMS_FILTERED = 'SET_ITEMS_FILTERED';

export const setCurrentItem = (currentItem) => ({
  type: SET_CURRENT_ITEM,
  payload: currentItem,
});

export const setIndex = (index) => ({
  type: SET_INDEX,
  payload: index,
});

export const setItemsFiltered = (items) => ({
  type: SET_ITEMS_FILTERED,
  payload: items,
});
