import { combineReducers } from 'redux';
import {
  SALES_SPEED_DIALOG_OPEN,
  SALES_SPEED_DIALOG_CLOSE,
  SALES_SPEED_DIALOG_SET_DATA,
} from './actions';

const initialState = {
  open: false,
  propertyPrice: 0,
  m2: 0,
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SALES_SPEED_DIALOG_OPEN:
      return { ...state, open: true };
    case SALES_SPEED_DIALOG_CLOSE:
      return { ...state, open: false };
    case SALES_SPEED_DIALOG_SET_DATA:
      return { ...state, ...payload };
    default:
      return state;
  }
};

export default combineReducers({
  root: reducer,
  // info: infoReducer
});
