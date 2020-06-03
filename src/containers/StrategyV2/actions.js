export const CHANGE_STRATEGY = 4;
export const CHANGE_MARKET__AVERAGE_PRICE = 5;
export const CHANGE_MARKET__EA_RATE = 6;
export const CHANGE_MARKET__LINE = 'CHANGE_MARKET__LINE';
export const CHANGE_GROUP = 'CHANGE_GROUP';
export const CHANGE_SALE_SPEED = 'CHANGE_SALE_SPEED';
export const CHANGE_INCREMENT = 'CHANGE_INCREMENT';
export const FETCH_DATA__START = 'FETCH_DATA__START';
export const FETCH_DATA__SUCCESS = 'FETCH_DATA__SUCCESS';
export const FETCH_DATA__INIT = 'FETCH_DATA__INIT';
export const CHANGE_SUGGESTED_EA = 'CHANGE_SUGGESTED_EA';
export const CHANGE_SUMMARY = 'CHANGE_SUMMARY';
export const FETCH_DATA__EMPTY = 'FETCH_DATA__EMPTY';

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

export const changeMarketGraph = (marketLine) => ({
  type: CHANGE_MARKET__LINE,
  payload: marketLine,
});

export const changeSaleSpeed = (saleSpeed) => ({
  type: CHANGE_SALE_SPEED,
  payload: saleSpeed,
});

export const changeIncrement = (increment) => ({
  type: CHANGE_INCREMENT,
  payload: increment,
});

export const changeSummary = (summary) => ({
  type: CHANGE_SUMMARY,
  payload: summary,
});

export const changeSuggestedEA = (suggestedEffectiveAnnualInterestRate) => ({
  type: CHANGE_SUGGESTED_EA,
  payload: suggestedEffectiveAnnualInterestRate,
});

export const fetchDataSuccess = (payload) => ({
  type: FETCH_DATA__SUCCESS,
  payload,
});

export const fetchDataInit = (payload) => ({
  type: FETCH_DATA__INIT,
  payload,
});

export const fetchDataStart = () => ({
  type: FETCH_DATA__START,
});

export const fetchDataEmpty = () => ({
  type: FETCH_DATA__EMPTY,
});