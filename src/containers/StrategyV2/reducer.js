import { combineReducers } from 'redux';
import {
  CHANGE_STRATEGY,
  CHANGE_MARKET__AVERAGE_PRICE,
  CHANGE_MARKET__EA_RATE,
} from './actions';
import { reducer as SettingsReducer } from '../../components/StrategyV2/Settings';
import { reducer as OverviewReducer } from '../../components/StrategyV2/Overviews';

export const initialState = {
  selectedGroup: 1,
  groups: {
    1: {
      total: {
        l0: 1000,
        units: 10,
        averageArea: 4,
        increment: 56.2,
        saleSpeed: 1,
        EARate: 0,
        incrementRate: 0,
      },
      sales: {
        l0: 500,
        units: 5,
        averageArea: 4,
        increment: 10.1,
        saleSpeed: 1,
        EARate: 0,
      },
      inventory: {
        l0: 500,
        averageArea: 4,
        projectedSales: 500,
        saleSpeed: 1,
        EARate: 0.1269,
        appliedIncrement: 25.5,
        sales: 600,
      },
      strategy: 3,
      market: {
        averagePrice: 100,
        EARate: 0.123,
      },
    },
    2: {},
    3: {},
  },
};

const changeStrategy = (groups, group, strategy) => {
  const tempGroups = { ...groups };
  tempGroups[group].strategy = strategy;
  return tempGroups;
};

const changeMarketAveragePrice = (groups, group, averagePrice) => {
  const tempGroups = { ...groups };
  tempGroups[group].market.averagePrice = averagePrice;
  return tempGroups;
};

const changeMarketEARate = (groups, group, EARate) => {
  const tempGroups = { ...groups };
  tempGroups[group].market.EARate = EARate;
  return tempGroups;
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case CHANGE_STRATEGY:
      return {
        ...state,
        groups: changeStrategy(state.groups, state.selectedGroup, payload),
      };
    case CHANGE_MARKET__AVERAGE_PRICE:
      return {
        ...state,
        groups: changeMarketAveragePrice(
          state.groups,
          state.selectedGroup,
          payload,
        ),
      };
    case CHANGE_MARKET__EA_RATE:
      return {
        ...state,
        groups: changeMarketEARate(state.groups, state.selectedGroup, payload),
      };
    default:
      return state;
  }
};

export default combineReducers({
  root: reducer,
  settings: SettingsReducer,
  overviews: OverviewReducer,
});
