import { combineReducers } from 'redux';
import {
  CHANGE_GROUP,
  CHANGE_STRATEGY,
  CHANGE_MARKET__AVERAGE_PRICE,
  CHANGE_MARKET__EA_RATE,
  CHANGE_INCREMENT,
  CHANGE_SALE_SPEED,
  FETCH_DATA__SUCCESS,
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
      initialFee: 17,
    },
    2: {},
    3: {},
  },
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case CHANGE_GROUP:
      return { ...state, selectedGroup: payload };
    case CHANGE_STRATEGY:
      return {
        ...state,
        groups: {
          ...state.groups,
          [state.selectedGroup]: {
            ...state.groups[state.selectedGroup],
            strategy: payload,
          },
        },
      };
    case CHANGE_MARKET__AVERAGE_PRICE:
      return {
        ...state,
        groups: {
          ...state.groups,
          [state.selectedGroup]: {
            ...state.groups[state.selectedGroup],
            market: {
              ...state.groups[state.selectedGroup].market,
              averagePrice: payload,
            },
          },
        },
      };
    case CHANGE_MARKET__EA_RATE:
      return {
        ...state,
        groups: {
          ...state.groups,
          [state.selectedGroup]: {
            ...state.groups[state.selectedGroup],
            market: {
              ...state.groups[state.selectedGroup].market,
              EARate: payload,
            },
          },
        },
      };
    case CHANGE_SALE_SPEED:
      return {
        ...state,
        groups: {
          ...state.groups,
          [state.selectedGroup]: {
            ...state.groups[state.selectedGroup],
            inventory: {
              ...state.groups[state.selectedGroup].inventory,
              saleSpeed: payload,
            },
          },
        },
      };
    case CHANGE_INCREMENT: {
      const group = state.groups[state.selectedGroup];
      const increment =
        payload + group.inventory.appliedIncrement + group.sales.increment;
      return {
        ...state,
        groups: {
          ...state.groups,
          [state.selectedGroup]: {
            ...state.groups[state.selectedGroup],
            total: { ...state.groups[state.selectedGroup].total, increment },
          },
        },
      };
    }
    case FETCH_DATA__SUCCESS:
      return { ...state, groups: payload };
    default:
      return state;
  }
};

export default combineReducers({
  root: reducer,
  settings: SettingsReducer,
  overviews: OverviewReducer,
});
