import TowerServiceDefinitions from './TowerServiceDefinitions';
import Services from '../services'


export default class TowerServices extends Services  {

  getTowers(projectId) {
    return this.get(TowerServiceDefinitions.towerForProject(projectId))
  }

  createTower(data) {
    return this.post(TowerServiceDefinitions.tower, data)
  }

  removeTower(data) {
    return this.delete(TowerServiceDefinitions.tower, data)
  }

}