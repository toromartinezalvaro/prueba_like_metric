import SalesRoomDefinitions from './salesRoomServiceDefinitions';
import Services from '../services';

export default class SalesRoomService extends Services {
  getProperties(towerId, clientId) {
    return this.get(SalesRoomDefinitions.salesRoom(towerId, clientId));
  }

  putState(data, towerId) {
    return this.put(SalesRoomDefinitions.putState(towerId), data);
  }
}
