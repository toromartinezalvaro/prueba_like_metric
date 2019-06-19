import { API_PATH } from '../../config/config'

const StrategyDefinitions = {
  strategy: towerId => `${API_PATH}strategy/${towerId}`,
};

export default StrategyDefinitions