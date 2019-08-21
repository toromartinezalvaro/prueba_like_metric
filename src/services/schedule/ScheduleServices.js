import ScheduleServicesDefinition from './ScheduleServicesDefinition';
import Services from '../services';

export default class ScheduleServices extends Services {
  getDates(towerId) {
    return this.get(ScheduleServicesDefinition.getDates(towerId));
  }

  putSalesStartDate(towerId, body) {
    return this.put(ScheduleServicesDefinition.putSalesStartDate(towerId), body);
  }

  putEndOfSalesDate(towerId, body) {
    return this.put(ScheduleServicesDefinition.putEndOfSalesDate(towerId), body);
  }

  putFirstSaleHandler(towerId, body) {
    return this.put(ScheduleServicesDefinition.putFirstSaleHandler(towerId), body);
  }
}
