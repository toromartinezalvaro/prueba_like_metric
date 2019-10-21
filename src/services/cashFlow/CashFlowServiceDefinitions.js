import { API_PATH } from '../../config/config';

const CashFlowDefinitions = {
  cashFlow: (towerId) => `${API_PATH}cashFlow/${towerId}`,
};

export default CashFlowDefinitions;
