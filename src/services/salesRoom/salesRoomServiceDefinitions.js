import { API_PATH } from '../../config/config';

const SalesRoomDefinitions = {
  salesRoom: towerId => `${API_PATH}salesRoom/${towerId}`,
  putState: towerId => `${API_PATH}salesRoom/putState/${towerId}`
};

export default SalesRoomDefinitions;
