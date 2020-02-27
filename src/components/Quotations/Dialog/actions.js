export const FETCH_QUOTATION__START = 'FQS';
export const FETCH_QUOTATION__SUCCESS = 'FQSS';
export const FETCH_QUOTATION__FAILURE = 'FQF';

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
