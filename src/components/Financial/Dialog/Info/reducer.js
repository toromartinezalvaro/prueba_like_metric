import { combineReducers } from 'redux';
import { reducer as bankCreditReducer } from './BankCredit';

export default combineReducers({ bank: bankCreditReducer });
