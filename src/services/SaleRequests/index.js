import ServiceDefinitions from './ServiceDefinitions';
import Services from '../services';

class SaleRequestsServices extends Services {
  getSaleRequests(towerId) {
    return this.get(ServiceDefinitions.getSaleRequests(towerId));
  }

  getSaleRequest(id) {
    return this.get(ServiceDefinitions.getSaleRequest(id));
  }
}

export default SaleRequestsServices;
