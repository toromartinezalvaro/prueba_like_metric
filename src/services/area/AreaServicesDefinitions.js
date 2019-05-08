import { API_PATH } from '../../config/config'

const AreaServiceDefinitions = {
  areaByTypeId: areaTypeId => { return `${API_PATH}areas/area-types/${areaTypeId}`},
  areas: towerId => {return `${API_PATH}areas/${towerId}`}
};

export default AreaServiceDefinitions