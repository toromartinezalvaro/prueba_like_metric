import ServiceDefinitions from './ServiceDefinitions';
import Services from '../services';

class SaleRequestsServices extends Services {
  getData(towerId) {
    return this.get(ServiceDefinitions.getData(towerId));
  }

  addArea(propertyId, areaId) {
    return this.put(ServiceDefinitions.addArea(propertyId, areaId));
  }

  removeArea(areaId) {
    return this.delete(ServiceDefinitions.removeArea(areaId));
  }
}

export default SaleRequestsServices;
