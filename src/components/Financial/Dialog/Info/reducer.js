import { combineReducers } from 'redux';
import { reducer as bankCreditReducer } from './BankCredit';
import { reducer as FinancialInfoReducer } from './FinancialInfo';
import { reducer as initialFeeInfoReducer } from './InitialFee';
import { reducer as extraFeesReducer } from './ExtraFees';
import { reducer as datesReducer } from './Dates';

export default combineReducers({
  bank: bankCreditReducer,
  info: FinancialInfoReducer,
  initialFee: initialFeeInfoReducer,
  extraFees: extraFeesReducer,
  dates: datesReducer,
});
