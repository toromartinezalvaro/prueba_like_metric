import { API_PATH } from '../../config/config';

const SalesRoomDefinitions = {
  salesRoom: (towerId, clientId) =>
    `${API_PATH}salesRoom/${towerId}/${clientId}`,
  getAdditionalAreas: (towerId) =>
    `${API_PATH}pairings/additional-areas/${towerId}`,
  addAdditionalArea: (propertyId, areaId) =>
    `${API_PATH}pairings/sales-rooms/property/${propertyId}/area/${areaId}`,
  putState: (towerId, clientId) =>
    `${API_PATH}salesRoom/putState/${towerId}/${clientId}`,
};

export default SalesRoomDefinitions;
