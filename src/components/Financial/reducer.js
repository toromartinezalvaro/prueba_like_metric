import { combineReducers } from 'redux';
import { reducer as dialogReducer } from './Dialog';

export default combineReducers({ dialog: dialogReducer });
