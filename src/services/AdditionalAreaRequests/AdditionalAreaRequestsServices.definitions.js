import { API_PATH } from '../../config/config';

const REQUESTS_URI = 'additional-areas/requests';

const AdditionalAreaRequestsServices = {
  getRequestByTower: (towerId) => `${API_PATH}${REQUESTS_URI}/towers/${towerId}`,
};

export default AdditionalAreaRequestsServices;
