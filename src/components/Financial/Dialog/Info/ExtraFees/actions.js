import uuidV4 from 'uuid/v4';

export const SET_EXTRA_FEES_INFO = uuidV4();

export const setExtraFeesInfo = (info) => ({
  type: SET_EXTRA_FEES_INFO,
  payload: info,
});
