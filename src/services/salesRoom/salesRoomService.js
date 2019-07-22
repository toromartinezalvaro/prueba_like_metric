import SalesRoomDefinitions from './salesRoomServiceDefinitions';
import Services from '../services';

export default class SalesRoomService extends Services {
  getProperties(towerId) {
    return this.get(SalesRoomDefinitions.salesRoom(towerId));
  }
  putState(data, towerId) {
    return this.put(SalesRoomDefinitions.putState(towerId), data);
  }
}
