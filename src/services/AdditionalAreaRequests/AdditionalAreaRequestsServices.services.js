import definitions from './AdditionalAreaRequestsServices.definitions';
import Services from '../services';

export default class AdditionalAreaRequestsServices extends Services {
  getRequestByTower(towerId) {
    return this.get(definitions.getRequestByTower(towerId));
  }
}
