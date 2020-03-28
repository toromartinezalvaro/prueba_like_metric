import {
  TOGGLE_PRICES,
  CHANGE_VIEW,
  CHANGE_GROUP,
  CHANGE_STRATEGY,
  CHANGE_MARKET__AVERAGE_PRICE,
  CHANGE_MARKET__EA_RATE,
} from './actions';

export const MAIN_VIEW = 'main';
export const DETAILS_VIEW = 'details';

export const initialState = {
  settings: {
    prices: {
      withoutIncrements: false,
    },
  },
  view: MAIN_VIEW,
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
    case TOGGLE_PRICES:
      return {
        ...state,
        settings: {
          prices: {
            withoutIncrements: !state.settings.prices.withoutIncrements,
          },
        },
      };
    case CHANGE_VIEW:
      return { ...state, view: payload };
    case CHANGE_GROUP:
      return { ...state, selectedGroup: payload };
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

export default reducer;
