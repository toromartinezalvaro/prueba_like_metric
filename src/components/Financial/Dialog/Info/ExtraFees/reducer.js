import { SET_EXTRA_FEES_INFO } from './actions';

const initialState = {
  totalExtraFees: 0,
  totalBonus: 0,
  totalLayoffs: 0,
  anotherExtraFees: 0,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_EXTRA_FEES_INFO:
      return { ...state, ...payload };

    default:
      return state;
  }
};
