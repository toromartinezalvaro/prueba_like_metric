import { API_PATH } from '../../config/config';

const ClientsServiceDefinitions = {
  getEnums: () => `${API_PATH}clients/enumerators`,
  postClient: () => `${API_PATH}clients/`,
};

export default ClientsServiceDefinitions;
