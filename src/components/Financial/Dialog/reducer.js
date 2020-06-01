import { combineReducers } from 'redux';
import { reducer as infoReducer } from './Info';
import {
  FINANCIAL_DIALOG_OPEN,
  FINANCIAL_DIALOG_CLOSE,
  FINANCIAL_DIALOG_SET_DATA,
} from './actions';

const initialState = {
  open: false,
  propertyPrice: 0,
  m2: 0,
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FINANCIAL_DIALOG_OPEN:
      return { ...state, open: true };
    case FINANCIAL_DIALOG_CLOSE:
      return { ...state, open: false };
    case FINANCIAL_DIALOG_SET_DATA:
      return { ...state, ...payload };
    default:
      return state;
  }
};

export default combineReducers({ root: reducer, info: infoReducer });
