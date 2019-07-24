import FutureSalesSpeedsDefinitions from './FutureSalesSpeedsDefinition';
import Services from '../services';

export default class FutureSalesSpeedsServices extends Services {
  getFutureSalesSpeeds(towerId) {
    return this.get(FutureSalesSpeedsDefinitions.getFutureSalesSpeeds(towerId));
  }
  putFutureSalesSpeeds(id, futureSalesSpeed) {
    return this.put(FutureSalesSpeedsDefinitions.putFutureSalesSpeeds(id), {
      futureSalesSpeed,
    });
  }
}
