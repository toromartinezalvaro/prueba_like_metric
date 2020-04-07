import { combineReducers } from 'redux';
import { reducer as StrategyReducer } from './containers/StrategyV2';

export default combineReducers({
  strategy: StrategyReducer,
});
