import { API_PATH } from '../../config/config';

const IMPORTS = 'imports';

const ClientsServiceDefinitions = {
  getSchemaTemplate: (towerId) => `${API_PATH}${IMPORTS}/schemas/${towerId}`,
  postSchema: (towerId) => `${API_PATH}${IMPORTS}/schemas/${towerId}`,
  getTowerInfo: (towerId) => `${API_PATH}${IMPORTS}/towers/${towerId}`,
};

export default ClientsServiceDefinitions;
