import {
  GROUPS_OPEN_CREATE_ITEM_DIALOG,
  GROUPS_CLOSE_CREATE_ITEM_DIALOG,
  GROUP_CREATE_DIALOG_API_START,
  GROUP_CREATE_DIALOG_API_FAIL,
} from './action';

const initialState = {
  open: false,
  loading: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GROUPS_OPEN_CREATE_ITEM_DIALOG:
      return { ...state, open: true, loading: false };
    case GROUPS_CLOSE_CREATE_ITEM_DIALOG:
      return { ...state, open: false, loading: false };
    case GROUP_CREATE_DIALOG_API_START:
      return { ...state, loading: true };
    case GROUP_CREATE_DIALOG_API_FAIL:
      return { ...state, loading: false };
    default:
      return state;
  }
};
