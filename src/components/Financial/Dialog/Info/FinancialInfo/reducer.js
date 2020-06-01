import { SET_FINANCIAL_INFO } from './actions';

const initialState = {
  propertyValue: 0,
  m2: 0,
  m2Price: 0,
  financing: 0,
  paidPrice: 0,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_FINANCIAL_INFO:
      return { ...state, ...payload };

    default:
      return state;
  }
};
