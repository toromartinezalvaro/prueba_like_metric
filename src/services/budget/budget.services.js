import definitions from './budget.definitions';
import Services from '../services';

export default class ClientsServices extends Services {
  getBudget(towerId) {
    return this.get(definitions.getBudget(towerId));
  }

  putBudget(towerId, data) {
    return this.put(definitions.putBudget(towerId), data);
  }

  putMonthBudget(towerId, month, data) {
    return this.put(definitions.putMonthBudget(towerId, month), data);
  }
}
