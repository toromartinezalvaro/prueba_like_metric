import ScheduleServicesDefinition from './ScheduleServicesDefinition';
import Services from '../services';

export default class ScheduleServices extends Services {
  getDates(towerId) {
    return this.get(ScheduleServicesDefinition.getDates(towerId));
  }

  putSalesStartDate(towerId, body) {
    return this.put(
      ScheduleServicesDefinition.putSalesStartDate(towerId),
      body,
    );
  }

  putBalancePointDate(towerId, body) {
    return this.put(
      ScheduleServicesDefinition.putBalancePointDate(towerId),
      body,
    );
  }

  putConstructionStartDate(towerId, body) {
    return this.put(
      ScheduleServicesDefinition.putConstructionStartDate(towerId),
      body,
    );
  }

  putAverageDeliveryDate(towerId, body) {
    return this.put(
      ScheduleServicesDefinition.putAverageDeliveryDate(towerId),
      body,
    );
  }

  putEndOfSalesDate(towerId, body) {
    return this.put(
      ScheduleServicesDefinition.putEndOfSalesDate(towerId),
      body,
    );
  }

  putMaximumCollectionDate(towerId, body) {
    return this.put(
      ScheduleServicesDefinition.putMaximumCollectionDate(towerId),
      body,
    );
  }

  putFirstSaleHandler(towerId, body) {
    return this.put(
      ScheduleServicesDefinition.putFirstSaleHandler(towerId),
      body,
    );
  }
}
