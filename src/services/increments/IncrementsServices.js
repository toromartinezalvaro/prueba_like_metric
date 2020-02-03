import IncrementsServicesDefinition from './IncrementsServicesDefinition';
import Services from '../services';

export default class IncrementsServices extends Services {
  resetStrategy(groupId) {
    return this.put(IncrementsServicesDefinition.resetStrategy(groupId));
  }

  getMarket(towerId) {
    return this.get(IncrementsServicesDefinition.getMarket(towerId));
  }

  putIncrements(towerId) {
    return this.put(IncrementsServicesDefinition.putIncrements(towerId));
  }

  putFutureSalesSpeeds(id, futureSalesSpeed) {
    return this.put(IncrementsServicesDefinition.putFutureSalesSpeeds(id), {
      futureSalesSpeed,
    });
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

  putSuggestedSalesSpeeds(id, salesSpeed) {
    return this.put(
      IncrementsServicesDefinition.putSuggestedSalesSpeed(id),
      salesSpeed,
    );
  }

  putSuggestedEffectiveAnnualInterestRate(id, EffectiveAnnualInterestRate) {
    return this.put(
      IncrementsServicesDefinition.putSuggestedEffectiveAnnualInterestRate(id),
      EffectiveAnnualInterestRate,
    );
  }

  putMarketAveragePrice(groupId, body) {
    return this.put(
      IncrementsServicesDefinition.putMarketAveragePrice(groupId),
      body,
    );
  }

  putMarketAnualEffectiveIncrement(groupId, body) {
    return this.put(
      IncrementsServicesDefinition.putMarketAnualEffectiveIncrement(groupId),
      body,
    );
  }

  putSalesStartDate(towerId, body) {
    return this.put(
      IncrementsServicesDefinition.putSalesStartDate(towerId),
      body,
    );
  }

  putEndOfSalesDate(towerId, body) {
    return this.put(
      IncrementsServicesDefinition.putEndOfSalesDate(towerId),
      body,
    );
  }
}
