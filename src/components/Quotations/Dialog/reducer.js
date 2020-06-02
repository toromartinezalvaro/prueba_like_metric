import {
  FETCH_QUOTATION__START,
  FETCH_QUOTATION__SUCCESS,
  FETCH_QUOTATION__FAILURE,
  CHANGE_INITIAL_FEE_PERCENTAGE,
  CHANGE_RESERVE_PERCENTAGE,
} from './actions';

export const initialState = {
  quotation: {
    id: '',
    propertyPrice: 0,
    initialFeePercentage: 0,
    reservePercentage: 0,
    periods: 0,
    paymentStartDate: 0,
    temp: 0,
    property: {
      name: '',
    },
    client: { name: '', identityDocument: '', email: '' },
  },
  loading: false,
  error: false,
};

const editQuotationInitialFeePercentage = (quotation, initialFeePercentage) => {
  const tempQuotation = { ...quotation };
  tempQuotation.initialFeePercentage = initialFeePercentage;
  return tempQuotation;
};

const editQuotationReservePercentage = (quotation, reservePercentage) => {
  const tempQuotation = { ...quotation };
  tempQuotation.reservePercentage = reservePercentage;
  return tempQuotation;
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_QUOTATION__START:
      return { ...state, loading: true, error: false };
    case FETCH_QUOTATION__SUCCESS:
      return { ...state, quotation: payload, loading: false, error: false };
    case FETCH_QUOTATION__FAILURE:
      return { ...state, loading: false, error: true };
    case CHANGE_INITIAL_FEE_PERCENTAGE:
      return {
        ...state,
        quotation: editQuotationInitialFeePercentage(state.quotation, payload),
      };
    case CHANGE_RESERVE_PERCENTAGE:
      return {
        ...state,
        quotation: editQuotationReservePercentage(state.quotation, payload),
      };
    default:
      return state;
  }
};

export default reducer;
