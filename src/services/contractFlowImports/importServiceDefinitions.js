import { API_PATH } from '../../config/config';

const ClientsServiceDefinitions = {
  getContractFlowTemplate: (towerId) =>
    `${API_PATH}contract-flow-import/${towerId}`,
};

export default ClientsServiceDefinitions;
