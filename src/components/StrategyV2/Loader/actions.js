export const LOADING_START = 'LOADING_START';
export const LOADING_STOP = 'LOADING_STOP';

export const startLoading = () => ({
  type: LOADING_START,
});

export const stopLoading = () => ({
  type: LOADING_STOP,
});
