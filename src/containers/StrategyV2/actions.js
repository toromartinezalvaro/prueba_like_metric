export const CHANGE_STRATEGY = 4;
export const CHANGE_MARKET__AVERAGE_PRICE = 5;
export const CHANGE_MARKET__EA_RATE = 6;
export const CHANGE_GROUP = 'CHANGE_GROUP';
export const CHANGE_SALE_SPEED = 'CHANGE_SALE_SPEED';
export const CHANGE_INCREMENT = 'CHANGE_INCREMENT';

export const changeStrategy = (strategy) => ({
  type: CHANGE_STRATEGY,
  payload: strategy,
});
export const changeGroup = (group) => ({
  type: CHANGE_GROUP,
  payload: group,
});

export const changeMarketAveragePrice = (averagePrice) => ({
  type: CHANGE_MARKET__AVERAGE_PRICE,
  payload: averagePrice,
});
export const changeMarketEARate = (EARate) => ({
  type: CHANGE_MARKET__EA_RATE,
  payload: EARate,
});
export const changeSaleSpeed = (saleSpeed) => ({
  type: CHANGE_SALE_SPEED,
  payload: saleSpeed,
});
export const changeIncrement = (increment) => ({
  type: CHANGE_INCREMENT,
  payload: increment,
});
