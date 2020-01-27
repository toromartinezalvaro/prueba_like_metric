import { API_PATH } from '../../config/config';

const IncrementsServiceDefinition = {
  resetStrategy: (groupId) => {
    return `${API_PATH}strategy/reset-strategy/${groupId}`;
  },
  getMarket: (towerId) => {
    return `${API_PATH}pricingv2/markets/${towerId}`;
  },
  putIncrements: (towerId) => {
    return `${API_PATH}pricingv2/${towerId}`;
  },
  putFutureSalesSpeeds: (id) => {
    return `${API_PATH}pricing/definitions/futureSalesSpeeds/${id}`;
  },
  getIncrements: (towerId) => {
    return `${API_PATH}pricingv2/increments/${towerId}`;
  },
  getIncrementsSummary: (towerId) => {
    return `${API_PATH}pricingv2/${towerId}`;
  },
  getPeriodsIncrements: (towerId) => {
    return `${API_PATH}pricingv2/increments/${towerId}`;
  },
  putIncrement: (id) => {
    return `${API_PATH}pricingv2/definitions/increments/${id}`;
  },
  putSalesSpeed: (id) => {
    return `${API_PATH}pricingv2/definitions/salesSpeeds/${id}`;
  },
  putSuggestedSalesSpeed: (id) => {
    return `${API_PATH}pricingv2/definitions/suggestedSalesSpeeds/${id}`;
  },
  putSuggestedEffectiveAnnualInterestRate: (id) => {
    return `${API_PATH}pricingv2/definitions/suggestedEffectiveAnnualInterestRate/${id}`;
  },
  putMarketAnualEffectiveIncrement: (towerId) => {
    return `${API_PATH}pricingv2/definitions/markets/anualEffectiveIncrements/${towerId}`;
  },
  putMarketAveragePrice: (towerId) => {
    return `${API_PATH}pricingv2/definitions/markets/averagePrices/${towerId}`;
  },
  putSalesStartDate: (towerId) => {
    return `${API_PATH}pricingv2/definitions/salesStartDates/${towerId}`;
  },
  putEndOfSalesDate: (towerId) => {
    return `${API_PATH}pricingv2/definitions/endOfSalesDate/${towerId}`;
  },
};

export default IncrementsServiceDefinition;
