import { API_PATH } from '../../config/config';

const CashFlowDefinitions = {
  cashFlow: (towerId) => `${API_PATH}cash-flow/${towerId}`,
};

export default CashFlowDefinitions;
