import uuidV4 from 'uuid/v4';

export const SET_INITIAL_FEE_INFO = uuidV4();

export const setInitialFeeInfo = (info) => ({
  type: SET_INITIAL_FEE_INFO,
  payload: info,
});
