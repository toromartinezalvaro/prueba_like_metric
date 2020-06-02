import uuidV4 from 'uuid/v4';

export const SET_BANK_INFO = uuidV4();

export const setBankInfo = (info) => ({
  type: SET_BANK_INFO,
  payload: info,
});
