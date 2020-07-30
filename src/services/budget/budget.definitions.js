import { API_PATH } from '../../config/config';

const BUDGET = 'budgets';

const ClientsServiceDefinitions = {
  getBudget: (towerId) => `${API_PATH}${BUDGET}/${towerId}`,
  putBudget: (towerId) => `${API_PATH}${BUDGET}/${towerId}`,
  putMonthBudget: (towerId, month) =>
    `${API_PATH}${BUDGET}/towers/${towerId}/months/${month}`,
};

export default ClientsServiceDefinitions;
