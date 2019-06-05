import RackAreasDefinitions from './RackAreasServiceDefinitions'
import Services from '../services'

export default class DetailServices extends Services {
  getAreas(towerId) {
    return this.get(RackAreasDefinitions.rackAreas(towerId))
  }
}