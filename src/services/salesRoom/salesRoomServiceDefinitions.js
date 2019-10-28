import { API_PATH } from '../../config/config';

const SalesRoomDefinitions = {
  salesRoom: (towerId, clientId) =>
    `${API_PATH}salesRoom/${towerId}/${clientId}`,
  putState: (towerId) => `${API_PATH}salesRoom/putState/${towerId}`,
};

export default SalesRoomDefinitions;
