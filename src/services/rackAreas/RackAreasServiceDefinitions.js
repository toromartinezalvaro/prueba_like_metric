import { API_PATH } from '../../config/config'

const RackAreasDefinitions = {
  rackAreas: towerId => `${API_PATH}rackAreas/${towerId}`,
};

export default RackAreasDefinitions