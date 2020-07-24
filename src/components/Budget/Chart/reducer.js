import { BUDGET_CHART__SET_DATA } from './actions';

const initialState = {
  data: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case BUDGET_CHART__SET_DATA:
      return { ...state, data: payload };
    default:
      return state;
  }
};
