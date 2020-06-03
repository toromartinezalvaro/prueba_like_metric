import definitions from './AdditionalAreaRequestsServices.definitions';
import Services from '../services';

export default class AdditionalAreaRequestsServices extends Services {
  getRequestByTower(towerId) {
    return this.get(definitions.getRequestByTower(towerId));
  }

  putRequestStatus(requestId, status) {
    return this.put(definitions.putRequestStatus(requestId), { status });
  }

  postRequest(request) {
    return this.post(definitions.postRequest(), request);
  }
}