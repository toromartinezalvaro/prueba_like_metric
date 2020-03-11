import { API_PATH } from '../../config/config';

const PropertiesServicesDefinitions = {
  postTempQuotation: (id) => `${API_PATH}properties/${id}`,
};

export default PropertiesServicesDefinitions;
