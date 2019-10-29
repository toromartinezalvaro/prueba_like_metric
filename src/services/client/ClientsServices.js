import ClientsServicesDefinition from './ClientsServicesDefinition';
import Services from '../services';

export default class ClientsServices extends Services {
  getEnums(towerId) {
    return this.get(ClientsServicesDefinition.getEnums(towerId));
  }

  postClient(towerId, data) {
    return this.post(ClientsServicesDefinition.postClient(towerId), data);
  }

  putClient(identityDocument, towerId, data) {
    return this.put(
      ClientsServicesDefinition.putClient(identityDocument, towerId),
      data,
    );
  }

  addClient(towerId, data) {
    return this.put(ClientsServicesDefinition.addClient(towerId), data);
  }

  getClients(towerId) {
    return this.get(ClientsServicesDefinition.getClients(towerId));
  }

  getClient(identityDocument) {
    return this.get(ClientsServicesDefinition.getClient(identityDocument));
  }
}
