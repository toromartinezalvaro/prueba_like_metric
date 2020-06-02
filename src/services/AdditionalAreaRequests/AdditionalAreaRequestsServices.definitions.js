import { API_PATH } from '../../config/config';

const REQUESTS_URI = 'additional-areas/requests';

const AdditionalAreaRequestsServices = {
  getRequestByTower: (towerId) =>
    `${API_PATH}${REQUESTS_URI}/towers/${towerId}`,
  putRequestStatus: (id) => `${API_PATH}${REQUESTS_URI}/${id}`,
  postRequest: () => `${API_PATH}${REQUESTS_URI}/desists`
};

export default AdditionalAreaRequestsServices;
