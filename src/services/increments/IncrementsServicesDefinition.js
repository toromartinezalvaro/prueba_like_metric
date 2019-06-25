import { API_PATH } from '../../config/config';

const IncrementsServiceDefinition = {
  getIncrementsSummary: towerId => {
    return `${API_PATH}pricing/summaries/${towerId}`;
  },
};

export default IncrementsServiceDefinition;
