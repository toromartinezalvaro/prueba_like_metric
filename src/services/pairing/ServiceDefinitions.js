import { API_PATH } from '../../config/config';

const ServiceDefinitions = {
  getData: (towerId) => {
    return `${API_PATH}pairings/${towerId}`;
  },
  addArea: (propertyId, areaId) => {
    return `${API_PATH}pairings/property/${propertyId}/area/${areaId}`;
  },
  removeArea: (areaId) => {
    return `${API_PATH}pairings/${areaId}`;
  },
};

export default ServiceDefinitions;
