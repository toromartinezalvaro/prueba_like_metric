import { API_PATH } from '../../config/config';

const IMPORTS = 'groupImports';

const ClientsServiceDefinitions = {
  getGroupTemplate: (companyId) =>
    `${API_PATH}${IMPORTS}/group-import/${companyId}`,
  postSchema: () => `${API_PATH}${IMPORTS}/group-import`,
};

export default ClientsServiceDefinitions;
