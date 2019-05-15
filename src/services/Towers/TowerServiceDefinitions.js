import { API_PATH } from '../../config/config'

const TowerServiceDefinitions = {
  towerForProject: projectId => { return `${API_PATH}tower/${projectId}` },
  tower: `${API_PATH}tower`,
  singleTower: (towerId, projectId) => { return `${API_PATH}tower/single/${projectId}/${towerId}` }
};

export default TowerServiceDefinitions