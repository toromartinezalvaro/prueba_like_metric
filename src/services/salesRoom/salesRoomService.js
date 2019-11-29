import SalesRoomDefinitions from './salesRoomServiceDefinitions';
import Services from '../services';

export default class SalesRoomService extends Services {
  getProperties(towerId, clientId) {
    return this.get(SalesRoomDefinitions.salesRoom(towerId, clientId));
  }

  getAdditionalAreas(towerId) {
    return this.get(SalesRoomDefinitions.getAdditionalAreas(towerId));
  }

  addAdditionalArea(propertyId, areaId) {
    return this.put(SalesRoomDefinitions.addAdditionalArea(propertyId, areaId));
  }

  putState(data, towerId, clientId) {
    return this.put(SalesRoomDefinitions.putState(towerId, clientId), data);
  }
}
