import { API_PATH } from '../../config/config'

const AreaServiceDefinitions = {
  areaByTypeId: areaTypeId => { return `${API_PATH}areas/area-types/${areaTypeId}`},
  areas: towerId => {return `${API_PATH}areas/${towerId}`},
  areaPricesById: areaTypeId => { return `${API_PATH}areas/prices/${areaTypeId}`},
  areasTypePrice: areaTypeId => { return `${API_PATH}areas/area-types/${areaTypeId}/prices/`},
  areasPrices: (towerId, areaTypeId) => {return `${API_PATH}areas/${towerId}/area-types/${areaTypeId}/prices`},
};

export default AreaServiceDefinitions