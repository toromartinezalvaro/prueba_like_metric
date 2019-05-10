import { API_PATH } from '../../config/config'

const TowerServiceDefinitions = {
  towerForProject: projectId => { return `${API_PATH}tower/${projectId}` },
};

export default TowerServiceDefinitions