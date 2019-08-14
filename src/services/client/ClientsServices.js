import ClientsServicesDefinition from './ClientsServicesDefinition';
import Services from '../services';

export default class ClientsServices extends Services {
  getEnums(towerId) {
    return this.get(ClientsServicesDefinition.getEnums(towerId));
  }

  postClient(data) {
    return this.post(ClientsServicesDefinition.postClient(), data);
  }
}
