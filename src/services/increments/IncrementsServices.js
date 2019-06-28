import IncrementsServicesDefinition from './IncrementsServicesDefinition';
import Services from '../services';

export default class IncrementsServices extends Services {
  getIncrementsSummary(towerId) {
    return this.get(IncrementsServicesDefinition.getIncrementsSummary(towerId));
  }

  postIncrements(towerId, body) {
    return this.post(IncrementsServicesDefinition.clusterize(towerId), body);
  }

 
}
