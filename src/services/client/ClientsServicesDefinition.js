import { API_PATH } from '../../config/config';

const ClientsServiceDefinitions = {
  getEnums: towerId => `${API_PATH}clients/enumerators/${towerId}`,
  postClient: () => `${API_PATH}clients/`,
};

export default ClientsServiceDefinitions;
