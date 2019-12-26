import { API_PATH } from '../../config/config';

const ContractFlowServiceDefinition = {
  getContractsInformation: (towerId) => `${API_PATH}contract-flow/${towerId}`,
};

export default ContractFlowServiceDefinition;
