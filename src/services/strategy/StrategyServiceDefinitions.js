import { API_PATH } from '../../config/config';

const StrategyDefinitions = {
  strategy: towerId => `${API_PATH}strategy/${towerId}`,
  putStrategy: `${API_PATH}strategy`
};

export default StrategyDefinitions;
