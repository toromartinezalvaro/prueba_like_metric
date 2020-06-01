import {
  FINANCIAL_BANK_DIALOG_OPEN,
  FINANCIAL_BANK_DIALOG_CLOSE,
} from './actions';

const initialState = {
  open: false,
};

export default (state = initialState, { type }) => {
  switch (type) {
    case FINANCIAL_BANK_DIALOG_OPEN:
      return { ...state, open: true };
    case FINANCIAL_BANK_DIALOG_CLOSE:
      return { ...state, open: false };
    default:
      return state;
  }
};
