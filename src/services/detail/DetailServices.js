import DetailServiceDefinitions from './DetailServiceDefinitions'
import Services from '../services'

export default class DetailServices extends Services {
  getDetails() {
    return this.get(DetailServiceDefinitions.details)
  }
}