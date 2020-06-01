import definitions from './financing.definitions';
import Services from '../services';

export default class ClientsServices extends Services {
  getFinancingInfo(towerId, values) {
    return this.post(definitions.getFinancingInfo(towerId), values);
  }

  getTowerDates(towerId) {
    return this.get(definitions.getTowerDates(towerId));
  }
}
