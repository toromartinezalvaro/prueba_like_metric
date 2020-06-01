import { SET_INITIAL_FEE_INFO } from './actions';

const initialState = {
  initialFeeValue: 0,
  separationValue: 0,
  monthlyFee: 0,
  months: 0,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_INITIAL_FEE_INFO:
      return { ...state, ...payload };

    default:
      return state;
  }
};
