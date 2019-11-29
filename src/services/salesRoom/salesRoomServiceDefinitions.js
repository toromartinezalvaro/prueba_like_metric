import { API_PATH } from '../../config/config';

const SalesRoomDefinitions = {
  salesRoom: (towerId, clientId) =>
    `${API_PATH}salesRoom/${towerId}/${clientId}`,
  getAdditionalAreas: (towerId, clientId) =>
    `${API_PATH}pairings/additional-areas/${towerId}`,
  putState: (towerId, clientId) =>
    `${API_PATH}salesRoom/putState/${towerId}/${clientId}`,
};

export default SalesRoomDefinitions;
