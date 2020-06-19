import { API_PATH } from '../../config/config';

const IMPORTS = 'imports';

const ClientsServiceDefinitions = {
  getSchemaTemplate: (towerId) => `${API_PATH}${IMPORTS}/schemas/${towerId}`,
  getNomenclatureTemplate: (towerId) =>
    `${API_PATH}${IMPORTS}/nomenclatures/${towerId}`,
  postSchema: (towerId) => `${API_PATH}${IMPORTS}/schemas/${towerId}`,
  postNomenclature: (towerId) =>
    `${API_PATH}${IMPORTS}/nomenclatures/${towerId}`,
  getTowerInfo: (towerId) => `${API_PATH}${IMPORTS}/towers/${towerId}`,
  getCashFlowTemplate: (towerId) =>
    `${API_PATH}${IMPORTS}/cash-flow/${towerId}`,
};

export default ClientsServiceDefinitions;
