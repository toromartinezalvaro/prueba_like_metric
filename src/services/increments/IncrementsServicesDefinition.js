import { API_PATH } from '../../config/config';

const IncrementsServiceDefinition = {
  putIncrements: (towerId) => {
    return `${API_PATH}pricingv2/${towerId}`;
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
