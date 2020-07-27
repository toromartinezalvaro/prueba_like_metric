import { FINANCIAL_INFO_DATE__SET_END_OF_SALES } from './action';

const initialState = {
  averageDeliveryDate: new Date(),
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FINANCIAL_INFO_DATE__SET_END_OF_SALES:
      return { ...state, averageDeliveryDate: payload };
    default:
      return state;
  }
};
