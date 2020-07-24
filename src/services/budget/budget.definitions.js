import { API_PATH } from '../../config/config';

const BUDGET = 'budgets';

const ClientsServiceDefinitions = {
  getBudget: (towerId) => `${API_PATH}${BUDGET}/${towerId}`,
  putBudget: (towerId) => `${API_PATH}${BUDGET}/${towerId}`,
};

export default ClientsServiceDefinitions;
