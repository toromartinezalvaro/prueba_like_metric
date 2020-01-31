import { API_PATH } from '../../config/config';

const ClientsServiceDefinitions = {
  searchClients: (query) => `${API_PATH}clients/suggestions/?query=${query}`,
  postClient: (towerId) => `${API_PATH}clients/tower/${towerId}`,
  putClient: (identityDocument, towerId) =>
    `${API_PATH}clients/client/${identityDocument}/tower/${towerId}`,
  addClient: (towerId) => `${API_PATH}clients/tower/${towerId}`,
  getClients: (towerId) => `${API_PATH}clients/tower/${towerId}`,
  getClient: (text, type, towerId) =>
    `${API_PATH}clients/tower/${towerId}/${text}?type=${type}`,
  getPropertyInfo: (propertyId) => `${API_PATH}v2/properties/${propertyId}`,
  addClientToTower: (identityDocument, towerId) =>
    `${API_PATH}clients/tower-clients/client/${identityDocument}/tower/${towerId}`,
};

export default ClientsServiceDefinitions;
