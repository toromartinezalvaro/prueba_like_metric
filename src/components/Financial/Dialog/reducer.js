import { combineReducers } from 'redux';
import { reducer as infoReducer } from './Info';

export default combineReducers({ info: infoReducer });
