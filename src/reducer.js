import { combineReducers } from 'redux';
import { reducer as StrategyReducer } from './containers/StrategyV2';
import { reducer as GroupsReducer } from './containers/Groups';

export default combineReducers({
  strategy: StrategyReducer,
  groups: GroupsReducer,
});
