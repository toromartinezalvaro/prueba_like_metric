import {
  GROUPS_OPEN_CANT_DELETE_DIALOG,
  GROUPS_CLOSE_CANT_DELETE_DIALOG,
} from './action';

const initialState = {
  open: false,
  field: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GROUPS_OPEN_CANT_DELETE_DIALOG:
      return { ...state, open: true, field: payload };
    case GROUPS_CLOSE_CANT_DELETE_DIALOG:
      return { ...state, open: false, field: null };

    default:
      return state;
  }
};
