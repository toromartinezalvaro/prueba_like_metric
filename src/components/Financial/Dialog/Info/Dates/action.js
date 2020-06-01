export const FINANCIAL_INFO_DATE__SET_END_OF_SALES =
  'FINANCIAL_INFO_DATE__SET_END_OF_SALES';

export const setInfoDateData = (endOfSales) => ({
  type: FINANCIAL_INFO_DATE__SET_END_OF_SALES,
  payload: endOfSales,
});
