export const FETCH_QUOTATION__START = 'FQS';
export const FETCH_QUOTATION__SUCCESS = 'FQSS';
export const FETCH_QUOTATION__FAILURE = 'FQF';
export const CHANGE_INITIAL_FEE_PERCENTAGE = 'CIFP';
export const CHANGE_RESERVE_PERCENTAGE = 'CRP';

export const fetchQuotationStart = () => ({
  type: FETCH_QUOTATION__START,
});

export const fetchQuotationSuccess = (quotation) => ({
  type: FETCH_QUOTATION__SUCCESS,
  payload: quotation,
});

export const fetchQuotationFailure = () => ({
  type: FETCH_QUOTATION__FAILURE,
});

export const changeInitialFeePercentage = (value) => ({
  type: CHANGE_INITIAL_FEE_PERCENTAGE,
  payload: value,
});

export const changeReservePercentage = (value) => ({
  type: CHANGE_RESERVE_PERCENTAGE,
  payload: value,
});
