import { TOGGLE_PRICES, CHANGE_VIEW } from './actions';

export const MAIN_VIEW = 'main';
export const DETAILS_VIEW = 'details';

export const initialState = {
  settings: {
    prices: {
      withoutIncrements: false,
    },
  },
  view: MAIN_VIEW,
  selectedGroup: null,
  data: {
    total: {
      units: 10,
      averageArea: 4,
      saleSpeed: 'PD',
      inventoryRotation: 10,
      increment: 46.2,
      EARate: 'PD',
      L0Rate: 'PD',
      sales: {
        withIncrement: 1056.2,
        withoutIncrement: 1056.2,
      },
      averagePrice: 104.6,
      M2Price: 25.5,
    },
    sales: {
      units: 5,
      averageArea: 4,
      saleSpeed: 'PD',
      inventoryRotation: 10,
      increment: 10.1,
      EARate: 'PD',
      sales: 510.1,
      averagePrice: 104.6,
      M2Price: 25.5,
    },
    inventory: {
      units: 5,
      averageArea: 4,
      saleSpeed: 1,
      inventoryRotation: 10,
      appliedIncrement: 25.5,
      projectedIncrement: 10.6,
      EARate: 0.1268,
    },
    soldUnits: 5,
    totalSales: {},
    projectedSales: {
      withIncrement: 536.1,
      withoutIncrement: 500,
    },
  },
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
    default:
      return state;
  }
};

export default reducer;
