import { API_PATH } from '../../config/config';

const IncrementsServiceDefinition = {
  putIncrements: towerId => {
    return `${API_PATH}pricing/${towerId}`;
  },
  getIncrements: towerId => {
    return `${API_PATH}pricing/increments/${towerId}`;
  },
  getIncrementsSummary: towerId => {
    return `${API_PATH}pricing/summaries/${towerId}`;
  },
  putIncrement: id => {
    return `${API_PATH}pricing/increments/${id}`;
  },
  putSalesSpeed: id => {
    return `${API_PATH}pricing/definitions/salesSpeeds/${id}`;
  },
  putAnualEffectiveIncrement: id => {
    return `${API_PATH}pricing/definitions/anualEffectiveIncrements/${id}`;
  },
};

export default IncrementsServiceDefinition;
