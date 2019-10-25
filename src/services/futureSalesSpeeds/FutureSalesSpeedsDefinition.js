import { API_PATH } from '../../config/config';

const futureSalesSpeedsDefinitions = {
  getFutureSalesSpeeds: (towerId) => {
    return `${API_PATH}pricing/definitions/futureSalesSpeeds/${towerId}`;
  },
  putFutureSalesSpeeds: (id) => {
    return `${API_PATH}pricing/definitions/futureSalesSpeeds/${id}`;
  },
  putSeparation: (id) => {
    return `${API_PATH}pricing/definitions/separation/${id}`;
  },
  putInitialFee: (id) => {
    return `${API_PATH}pricing/definitions/initial-fee/${id}`;
  },
};

export default futureSalesSpeedsDefinitions;
