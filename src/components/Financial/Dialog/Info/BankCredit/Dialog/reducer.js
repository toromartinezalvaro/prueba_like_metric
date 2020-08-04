import {
  FINANCIAL_BANK_DIALOG_OPEN,
  FINANCIAL_BANK_DIALOG_CLOSE,
  SET_FINANCIAL_BANK_DIALOG_INFO,
  UPDATE_BANK_DIALOG_INFO,
} from './actions';

const initialState = {
  open: false,
  totalPaymentCredit: 0,
  totalYears: 0,
  months: 0,
  anualEffectiveRate: 0,
  monthlyRate: 0,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FINANCIAL_BANK_DIALOG_OPEN:
      return { ...state, open: true };
    case FINANCIAL_BANK_DIALOG_CLOSE:
      return { ...state, open: false };
    case SET_FINANCIAL_BANK_DIALOG_INFO:
      return { ...state, ...payload };
    case UPDATE_BANK_DIALOG_INFO:
      return { ...state, ...payload };
    default:
      return state;
  }
};
