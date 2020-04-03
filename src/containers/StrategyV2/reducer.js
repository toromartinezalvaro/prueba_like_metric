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
      id: 568,
      name: '',
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
        saleSpeed: 1,
        EARate: 0.1269,
        appliedIncrement: 25.5,
      },
      strategy: 3,
      market: {
        averagePrice: 100,
        anualEffectiveIncrement: 0.123,
      },
      initialFee: 17,
      data: [
        {
          name: 'Page A',
          uv: 4000,
          pv: 2400,
          amt: 2400,
        },
        {
          name: 'Page B',
          uv: 3000,
          pv: 1398,
          amt: 2210,
        },
        {
          name: 'Page C',
          uv: 2000,
          pv: 9800,
          amt: 2290,
        },
        {
          name: 'Page D',
          uv: 2780,
          pv: 3908,
          amt: 2000,
        },
        {
          name: 'Page E',
          uv: 1890,
          pv: 4800,
          amt: 2181,
        },
        {
          name: 'Page F',
          uv: 2390,
          pv: 3800,
          amt: 2500,
        },
        {
          name: 'Page G',
          uv: 3490,
          pv: 4300,
          amt: 2100,
        },
      ],
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
              anualEffectiveIncrement: payload,
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
      return {
        ...state,
        groups: {
          ...state.groups,
          [state.selectedGroup]: {
            ...state.groups[state.selectedGroup],
            total: {
              ...state.groups[state.selectedGroup].total,
              increment: payload,
            },
          },
        },
      };
    }
    case FETCH_DATA__SUCCESS:
      return {
        ...state,
        selectedGroup: Object.keys(payload)[0],
        groups: payload,
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
