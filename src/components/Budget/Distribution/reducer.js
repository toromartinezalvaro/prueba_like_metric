import { BUDGET_DISTRIBUTION__SET_DATA } from './actions';

const initialState = {
  units: 94,
  salesStartDate: new Date(),
  saleSpeed: 0,
  currentMonthSales: 0,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case BUDGET_DISTRIBUTION__SET_DATA:
      return { ...state, ...payload };
    default:
      return state;
  }
};
