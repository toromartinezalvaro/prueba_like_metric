import ServiceDefinitions from './ServiceDefinitions';
import Services from '../services';

class SaleRequestsServices extends Services {
  getData(towerId) {
    return this.get(ServiceDefinitions.getData(towerId));
  }
}

export default SaleRequestsServices;
