import ServiceDefinitions from './ServiceDefinitions';
import Services from '../services';

class SaleRequestsServices extends Services {
  getSaleRequests(towerId) {
    return this.get(ServiceDefinitions.getSaleRequests(towerId));
  }

  getSaleRequest(id) {
    return this.get(ServiceDefinitions.getSaleRequest(id));
  }

  putSaleRequest(id, request) {
    return this.put(ServiceDefinitions.putSaleRequest(id), request);
  }

  putPriceProperty(id, request) {
    return this.put(ServiceDefinitions.putPriceProperty(id), request);
  }

  getGroupDesistStatus(id) {
    return this.get(ServiceDefinitions.getGroupDesistStatus(id));
  }
}

export default SaleRequestsServices;
