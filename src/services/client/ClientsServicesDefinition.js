import { API_PATH } from '../../config/config';

const ClientsServiceDefinitions = {
  postClient: (towerId) => `${API_PATH}clients/tower/${towerId}`,
  putClient: (identityDocument, towerId) =>
    `${API_PATH}clients/client/${identityDocument}/tower/${towerId}`,
  addClient: (towerId) => `${API_PATH}clients/tower/${towerId}`,
  getClients: (towerId) => `${API_PATH}clients/tower/${towerId}`,
  getClient: (identityDocument, towerId) =>
    `${API_PATH}clients/${identityDocument}/${towerId}`,
};

export default ClientsServiceDefinitions;
