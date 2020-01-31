import ClientsServicesDefinition from './ClientsServicesDefinition';
import Services from '../services';

export default class ClientsServices extends Services {
  searchClients(query) {
    return this.get(ClientsServicesDefinition.searchClients(query));
  }

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

  getClient(text, type, towerId) {
    return this.get(ClientsServicesDefinition.getClient(text, type, towerId));
  }

  getPropertyInfo(propertyId) {
    return this.get(ClientsServicesDefinition.getPropertyInfo(propertyId));
  }

  addClientToTower(identityDocument, towerId) {
    return this.post(
      ClientsServicesDefinition.addClientToTower(identityDocument, towerId),
    );
  }
}
