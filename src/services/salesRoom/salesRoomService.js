import SalesRoomDefinitions from './StrategyServiceDefinitions';
import Services from '../services';

export default class SalesRoomService extends Services {
  putState(data) {
    return this.put(SalesRoomDefinitions.putState, data);
  }
}
