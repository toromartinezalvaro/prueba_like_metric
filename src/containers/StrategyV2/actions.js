export const TOGGLE_PRICES = 1;
export const CHANGE_VIEW = 2;

export const togglePrice = () => ({ type: TOGGLE_PRICES });
export const changeView = (view) => ({ type: CHANGE_VIEW, payload: view });
