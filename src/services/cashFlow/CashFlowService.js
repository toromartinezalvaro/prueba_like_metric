import CashFlowDefinitions from './CashFlowServiceDefinitions';
import Services from '../services';

export default class CashFlowServices extends Services {
  getCashFlow(towerId) {
    return this.get(CashFlowDefinitions.cashFlow(towerId));
  }
}
