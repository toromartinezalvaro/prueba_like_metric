import {
  OPEN_SALES_WIZARD_DIALOG,
  CLOSE_SALES_WIZARD_DIALOG,
  CHANGE_SUGGESTED_INCREMENT,
  CALCULATED,
  NOT_CALCULATED,
} from './actions';

const initialState = {
  open: false,
  suggestedIncrement: 0,
  calculated: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case OPEN_SALES_WIZARD_DIALOG:
      return { ...state, open: true };
    case CLOSE_SALES_WIZARD_DIALOG:
      return { ...state, open: false };
    case CHANGE_SUGGESTED_INCREMENT:
      return { ...state, suggestedIncrement: payload };
    case CALCULATED:
      return { ...state, calculated: true };
    case NOT_CALCULATED:
      return { ...state, calculated: false };
    default:
      return state;
  }
};
