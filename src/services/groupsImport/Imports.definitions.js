import { API_PATH } from '../../config/config';

const IMPORTS = 'groupImports';

const ClientsServiceDefinitions = {
  getGroupTemplate: (companyId) =>
    `${API_PATH}${IMPORTS}/group-import/${companyId}`,
  postSchema: (companyId) => `${API_PATH}${IMPORTS}/group-import/${companyId}`,
};

export default ClientsServiceDefinitions;
