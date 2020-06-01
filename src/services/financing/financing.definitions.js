import { API_PATH } from '../../config/config';

const FINANCING = 'financing';

const FinancingServicesDefinitions = {
  getFinancingInfo: (towerId) => `${API_PATH}${FINANCING}/structure/${towerId}`,
};

export default FinancingServicesDefinitions;
