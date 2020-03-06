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

  putPriceProperty(towerId, id, request) {
    return this.put(ServiceDefinitions.putPriceProperty(id, towerId), request);
  }

  getGroupDesistStatus(id) {
    return this.get(ServiceDefinitions.getGroupDesistStatus(id));
  }

  getPropertyAreas(propertyId) {
    return this.get(ServiceDefinitions.getPropertyAreas(propertyId));
  }
}

export default SaleRequestsServices;
