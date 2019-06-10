import ClusteringServiceDefinition from "./ClusteringServicesDefinition";
import Services from "../services";

export default class ClusteringServices extends Services {
  clusterize() {
    return this.get(ClusteringServiceDefinition.clusterize());
  }

  getClusters(areaTypeId) {
    return this.delete(ClusteringServiceDefinition.getClusters(areaTypeId));
  }
}
