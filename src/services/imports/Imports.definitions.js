import { API_PATH } from '../../config/config';

const IMPORTS = 'imports';

const ClientsServiceDefinitions = {
  getSchemaTemplate: (towerId) => `${API_PATH}${IMPORTS}/schemas/${towerId}`,
  postSchema: (towerId) => `${API_PATH}${IMPORTS}/schemas/${towerId}`,
};

export default ClientsServiceDefinitions;
