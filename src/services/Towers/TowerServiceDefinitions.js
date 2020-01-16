import { API_PATH } from '../../config/config';

const TowerServiceDefinitions = {
  towerForProject: (projectId) => {
    return `${API_PATH}tower/${projectId}`;
  },
  tower: `${API_PATH}tower`,
  singleTower: (towerId) => {
    return `${API_PATH}tower/single/${towerId}`;
  },
  updateTower: (id) => `${API_PATH}tower/${id}`,
};

export default TowerServiceDefinitions;
