import IncrementsServicesDefinition from './IncrementsServicesDefinition';
import Services from '../services';

export default class IncrementsServices extends Services {
  putIncrements(towerId) {
    return this.put(IncrementsServicesDefinition.putIncrements(towerId));
  }
  getIncrements(towerId) {
    return this.put(IncrementsServicesDefinition.putIncrements(towerId));
  }
  getIncrementsSummary(towerId) {
    return this.get(IncrementsServicesDefinition.getIncrementsSummary(towerId));
  }

  getPeriodsIncrements(towerId) {
    return this.get(IncrementsServicesDefinition.getPeriodsIncrements(towerId));
  }

  putIncrement(id, increment) {
    return this.put(IncrementsServicesDefinition.putIncrement(id), increment);
  }

  postIncrements(towerId, body) {
    return this.post(IncrementsServicesDefinition.clusterize(towerId), body);
  }

  putSalesSpeeds(id, salesSpeed) {
    return this.put(IncrementsServicesDefinition.putSalesSpeed(id), salesSpeed);
  }

  putAnualEffectiveIncrements(id, anualEffectiveIncrement) {
    return this.put(
      IncrementsServicesDefinition.putAnualEffectiveIncrement(id),
      anualEffectiveIncrement,
    );
  }

  putMarketAveragePrice(towerId, body) {
    return this.put(
      IncrementsServicesDefinition.putMarketAveragePrice(towerId),
      body,
    );
  }

  putMarketAnualEffectiveIncrement(towerId, body) {
    return this.put(
      IncrementsServicesDefinition.putMarketAnualEffectiveIncrement(towerId),
      body,
    );
  }
}
