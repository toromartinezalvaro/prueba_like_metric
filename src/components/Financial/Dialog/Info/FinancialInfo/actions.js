import uuidV4 from 'uuid/v4';

export const SET_FINANCIAL_INFO = uuidV4();

export const setFinancialInfo = (info) => ({
  type: SET_FINANCIAL_INFO,
  payload: info,
});
