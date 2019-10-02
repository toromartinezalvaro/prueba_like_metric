import { API_PATH } from '../../../config/config';

const ServiceDefinitions = {
  getRatings: (towerId) => {
    return `${API_PATH}qualitativePrimes/ratings/${towerId}`;
  },
  postRatings: (towerId) => {
    return `${API_PATH}qualitativePrimes/ratings/${towerId}`;
  },
  putRate: (id) => {
    return `${API_PATH}qualitativePrimes/ratings/${id}`;
  },
  deleteRate: (towerId) => {
    return `${API_PATH}qualitativePrimes/ratings/${towerId}`;
  },
};

export default ServiceDefinitions;
