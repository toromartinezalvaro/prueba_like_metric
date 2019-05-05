import { API_PATH } from '../../config/config'

const AreaServiceDefinitions = {
  areaByTypeId: areaTypeId => { return `${API_PATH}/areas/area-types/${areaTypeId}`},
  areas: `${API_PATH}areas`
};

export default AreaServiceDefinitions