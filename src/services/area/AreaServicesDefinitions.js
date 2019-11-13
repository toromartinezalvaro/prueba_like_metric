import { API_PATH } from '../../config/config';

const AreaServiceDefinitions = {
  areaByTypeId: (areaTypeId) => {
    return `${API_PATH}areasV2/area-types/${areaTypeId}`;
  },
  areas: (towerId) => {
    return `${API_PATH}areasV2/${towerId}`;
  },
  areaPricesById: (areaTypeId) => {
    return `${API_PATH}areasV2/prices/${areaTypeId}`;
  },
  areasTypePrice: (areaTypeId) => {
    return `${API_PATH}areasV2/area-types/${areaTypeId}/prices/`;
  },
  areasPrices: (towerId, areaTypeId) => {
    return `${API_PATH}areasV2/${towerId}/area-types/${areaTypeId}/prices`;
  },
};

export default AreaServiceDefinitions;
