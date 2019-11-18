import { API_PATH } from '../../config/config';

const ServiceDefinitions = {
  getData: (towerId) => {
    return `${API_PATH}pairings/${towerId}`;
  },
};

export default ServiceDefinitions;
