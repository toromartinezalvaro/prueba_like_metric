import ServiceDefinitions from './ServiceDefinitions';
import Services from '../../services';

class QualitativePrimesServices extends Services {
  getRatings(towerId) {
    return this.get(ServiceDefinitions.getRatings(towerId));
  }

  postRate(towerId, rate) {
    return this.post(ServiceDefinitions.postRatings(towerId), rate);
  }

  putRate(id, rate) {
    return this.put(ServiceDefinitions.putRate(id), rate);
  }

  deleteRate(towerId) {
    return this.delete(ServiceDefinitions.deleteRate(towerId));
  }
}

export default QualitativePrimesServices;
