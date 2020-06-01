import { FINANCIAL_INFO_DATE__SET_END_OF_SALES } from './action';

const initialState = {
  endOfSalesDate: new Date(),
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FINANCIAL_INFO_DATE__SET_END_OF_SALES:
      return { ...state, endOfSalesDate: payload };
    default:
      return state;
  }
};
