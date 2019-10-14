import ServiceDefinitions from './ServiceDefinitions';
import Services from '../../services';

class QualitativePrimesServices extends Services {
  getRatings(towerId) {
    return this.get(ServiceDefinitions.getRatings(towerId));
  }

  postRating(towerId, rate) {
    return this.post(ServiceDefinitions.postRatings(towerId), rate);
  }

  putRating(id, rate) {
    return this.put(ServiceDefinitions.putRating(id), rate);
  }

  deleteRating(towerId) {
    return this.delete(ServiceDefinitions.deleteRating(towerId));
  }

  getDescriptors(towerId) {
    return this.get(ServiceDefinitions.getDescriptors(towerId));
  }

  postDescriptor(towerId, descriptor) {
    return this.post(ServiceDefinitions.putDescriptor(towerId), descriptor);
  }

  putDescriptor(id, descriptor) {
    return this.put(ServiceDefinitions.putDescriptor(id), descriptor);
  }

  deleteDescriptor(id) {
    return this.delete(ServiceDefinitions.deleteDescriptor(id));
  }

  getPropertiesRatings(towerId) {
    return this.get(ServiceDefinitions.getPropertiesRatings(towerId));
  }

  postPropertyRating(propertyId, descriptorId, rating) {
    return this.post(
      ServiceDefinitions.postPropertyRating(propertyId, descriptorId),
      rating,
    );
  }

  putPropertyRating(propertyRatingId, rating) {
    return this.put(
      ServiceDefinitions.putPropertyRating(propertyRatingId),
      rating,
    );
  }

  postPrimes(primeType, towerId) {
    return this.post(ServiceDefinitions.postPrimes(primeType, towerId));
  }
}

export default QualitativePrimesServices;
