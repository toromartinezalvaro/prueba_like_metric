export const GROUPS_FETCH_API_START = 'GROUPS_FETCH_API_START';
export const GROUPS_FETCH_API_SUCCESS = 'GROUPS_FETCH_API_SUCCESS';
export const GROUPS_FETCH_API_FAIL = 'GROUPS_FETCH_API_FAIL';

export const startApiFetch = () => ({
  type: GROUPS_FETCH_API_START,
});

export const successApiFetch = () => ({
  type: GROUPS_FETCH_API_SUCCESS,
});

export const failApiFetch = () => ({
  type: GROUPS_FETCH_API_FAIL,
});
