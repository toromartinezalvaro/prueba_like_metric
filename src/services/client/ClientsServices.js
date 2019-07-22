import ClientsServicesDefinition from './ClientsServicesDefinition';
import Services from '../services';

export default class ClientsServices extends Services {
  getEnums() {
    return this.get(ClientsServicesDefinition.getEnums());
  }

  postClient(data) {
    return this.post(ClientsServicesDefinition.postClient(), data);
  }
}
