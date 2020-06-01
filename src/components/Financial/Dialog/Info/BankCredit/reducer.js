import { combineReducers } from 'redux';
import { reducer as dialogReducer } from './Dialog';
import { SET_BANK_INFO } from './actions';

const initialState = {
  totalPaymentCredit: 0,
  monthlyPayment: 0,
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_BANK_INFO:
      return { ...state, ...payload };

    default:
      return state;
  }
};

export default combineReducers({ root: reducer, dialog: dialogReducer });
