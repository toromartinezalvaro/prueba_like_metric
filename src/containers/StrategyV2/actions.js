export const TOGGLE_PRICES = 1;
export const CHANGE_VIEW = 2;
export const CHANGE_GROUP = 3;
export const CHANGE_STRATEGY = 4;
export const CHANGE_MARKET__AVERAGE_PRICE = 5;
export const CHANGE_MARKET__EA_RATE = 6;

export const togglePrice = () => ({ type: TOGGLE_PRICES });
export const changeView = (view) => ({ type: CHANGE_VIEW, payload: view });
export const changeGroup = (group) => ({ type: CHANGE_GROUP, payload: group });
export const changeStrategy = (strategy) => ({
  type: CHANGE_STRATEGY,
  payload: strategy,
});
export const changeMarketAveragePrice = (averagePrice) => ({
  type: CHANGE_MARKET__AVERAGE_PRICE,
  payload: averagePrice,
});
export const changeMarketEARate = (EARate) => ({
  type: CHANGE_MARKET__EA_RATE,
  payload: EARate,
});
