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
  getDescriptors: (towerId) => {
    return `${API_PATH}qualitativePrimes/descriptors/${towerId}`;
  },
  postDescriptor: (towerId) => {
    return `${API_PATH}qualitativePrimes/descriptors/${towerId}`;
  },
  putDescriptor: (id) => {
    return `${API_PATH}qualitativePrimes/descriptors/${id}`;
  },
  deleteDescriptor: (id) => {
    return `${API_PATH}qualitativePrimes/descriptors/${id}`;
  },
  getPropertiesRatings: (towerId) => {
    return `${API_PATH}qualitativePrimes/properties-rates/${towerId}`;
  },
  postPropertyRating: (propertyId, descriptorId) => {
    return `${API_PATH}qualitativePrimes/properties-rates/property/${propertyId}/descriptor/${descriptorId}`;
  },
};

export default ServiceDefinitions;
