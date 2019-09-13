import { API_PATH } from '../../config/config';

const ServiceDefinitions = {
  getReport: (towerId) => {
    return `${API_PATH}reports/${towerId}`;
  },
};

export default ServiceDefinitions;
