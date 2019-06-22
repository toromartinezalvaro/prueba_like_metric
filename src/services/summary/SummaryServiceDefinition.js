import { API_PATH } from '../../config/config'

const SummaryServiceDefinitions = {
  summary: towerId => { return `${API_PATH}summaries/${towerId}` },
};

export default SummaryServiceDefinitions