import { API_PATH } from '../../config/config';

const IncrementsServiceDefinition = {
  putIncrements: towerId => {
    return `${API_PATH}pricing/${towerId}`;
  },
  getIncrements: towerId => {
    return `${API_PATH}pricing/increments/${towerId}`;
  },
  getIncrementsSummary: towerId => {
    return `${API_PATH}pricing/${towerId}`;
  },
  getPeriodsIncrements: towerId => {
    return `${API_PATH}pricing/increments/${towerId}`;
  },
  putIncrement: id => {
    return `${API_PATH}pricing/definitions/increments/${id}`;
  },
  putSalesSpeed: id => {
    return `${API_PATH}pricing/definitions/salesSpeeds/${id}`;
  },
  putAnualEffectiveIncrement: id => {
    return `${API_PATH}pricing/definitions/anualEffectiveIncrements/${id}`;
  },
  putMarketAnualEffectiveIncrement: towerId => {
    return `${API_PATH}pricing/definitions/markets/anualEffectiveIncrements/${towerId}`;
  },
  putMarketAveragePrice: towerId => {
    return `${API_PATH}pricing/definitions/markets/averagePrices/${towerId}`;
  },
  putSalesStartDate: towerId => {
    return `${API_PATH}pricing/definitions/salesStartDates/${towerId}`
  }
};

export default IncrementsServiceDefinition;
