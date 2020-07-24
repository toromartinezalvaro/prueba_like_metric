import { combineReducers } from 'redux';
import { reducer as chartReducer } from '../../components/Budget/Chart';
import { reducer as distributionReducer } from '../../components/Budget/Distribution';

export default combineReducers({
  chart: chartReducer,
  distribution: distributionReducer,
});
