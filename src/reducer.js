import { combineReducers } from 'redux';
import { reducer as StrategyReducer } from './containers/StrategyV2';
import { reducer as GroupsReducer } from './containers/Groups';
import { reducer as UploadDialogReducer } from './components/Area/Imports/Upload';
import { reducer as FinancialReducer } from './components/Financial';
import { reducer as BuildingDialogReducer } from './components/Building/Imports/Upload';
import { reducer as BudgetReducer } from './containers/Budget';

export default combineReducers({
  strategy: StrategyReducer,
  groups: GroupsReducer,
  areas: UploadDialogReducer,
  building: BuildingDialogReducer,
  financial: FinancialReducer,
  budget: BudgetReducer,
});
