import RackAreasDefinitions from './RackAreasServiceDefinitions'
import Services from '../services'

export default class DetailServices extends Services {
  getAreas() {
    return this.get(RackAreasDefinitions.details)
  }
}