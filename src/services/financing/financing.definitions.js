import { API_PATH } from '../../config/config';

const FINANCING = 'financing';

const FinancingServicesDefinitions = {
  getFinancingInfo: (towerId) => `${API_PATH}${FINANCING}/structure/${towerId}`,
  getTowerDates: (towerId) => `${API_PATH}${FINANCING}/towers/${towerId}`,
};

export default FinancingServicesDefinitions;
