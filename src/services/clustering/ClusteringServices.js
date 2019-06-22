import ClusteringServiceDefinition from './ClusteringServicesDefinition';
import Services from '../services';

export default class ClusteringServices extends Services {
  postClusters(towerId, body) {
    return this.post(ClusteringServiceDefinition.clusterize(towerId), body);
  }

  putType(id, body) {
    return this.put(ClusteringServiceDefinition.putType(id), body);
  }

  getClusters(areaTypeId) {
    return this.get(ClusteringServiceDefinition.getClusters(areaTypeId));
  }

  getGroups(towerId) {
    return this.get(ClusteringServiceDefinition.getGroups(towerId));
  }
}
