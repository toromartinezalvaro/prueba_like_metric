import { combineReducers } from 'redux';
import {
  CHANGE_GROUP,
  CHANGE_STRATEGY,
  CHANGE_MARKET__AVERAGE_PRICE,
  CHANGE_MARKET__EA_RATE,
  CHANGE_INCREMENT,
  CHANGE_SALE_SPEED,
  FETCH_DATA__START,
  FETCH_DATA__INIT,
  FETCH_DATA__SUCCESS,
  CHANGE_SUGGESTED_EA,
  CHANGE_SUMMARY,
  CHANGE_MARKET__LINE,
} from './actions';
import { reducer as SettingsReducer } from '../../components/StrategyV2/Settings';
import { reducer as OverviewReducer } from '../../components/StrategyV2/Overviews';
import { reducer as APILoaderReducer } from '../../components/StrategyV2/Loader';

export const initialState = {
  loading: false,
  selectedGroup: 1,
  strategyLines: [],
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
        suggestedEffectiveAnnualInterestRate: 0,
        suggestedIncrement: 0,
      },
      strategy: 3,
      market: {
        averagePrice: 100,
        anualEffectiveIncrement: 0.123,
      },
      initialFee: 17,
      isReset: true,
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
            isReset: payload === null,
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
    case CHANGE_SUGGESTED_EA: {
      return {
        ...state,
        groups: {
          ...state.groups,
          [state.selectedGroup]: {
            ...state.groups[state.selectedGroup],
            inventory: {
              ...state.groups[state.selectedGroup].inventory,
              suggestedEffectiveAnnualInterestRate:
                payload.suggestedEffectiveAnnualInterestRate,
              suggestedIncrement: payload.suggestedIncrement,
            },
          },
        },
      };
    }
    case CHANGE_MARKET__LINE: {
      const marketLine = {
        ...state.strategyLines[state.selectedGroup].strategies[0],
      };
      const strategies = [
        ...state.strategyLines[state.selectedGroup].strategies,
      ];
      marketLine.data = payload;
      strategies[0] = marketLine;

      return {
        ...state,
        strategyLines: {
          ...state.strategyLines,
          [state.selectedGroup]: {
            ...state.strategyLines[state.selectedGroup],
            strategies,
          },
        },
      };
    }

    case FETCH_DATA__START: {
      return {
        ...state,
        loading: true,
      };
    }
    case FETCH_DATA__INIT: {
      const selectedGroup = Object.keys(payload.groups).sort(
        new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' })
          .compare,
      )[0];
      return {
        ...state,
        selectedGroup,
        loading: false,
        ...payload,
      };
    }
    case FETCH_DATA__SUCCESS:
      return {
        ...state,
        loading: false,
        ...payload,
      };
    case CHANGE_SUMMARY:
      return {
        ...state,
        groups: payload.increments,
      };
    default:
      return state;
  }
};

export default combineReducers({
  root: reducer,
  settings: SettingsReducer,
  overviews: OverviewReducer,
  api: APILoaderReducer,
});
