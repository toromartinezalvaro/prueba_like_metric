import { API_PATH } from "../../config/config";

const AreaServiceDefinitions = {
  clusterize: towerId => {
    return `${API_PATH}clustering/${towerId}`;
  },
  putType: id => {
    return `${API_PATH}clustering/properties/${id}`;
  },
  getClusters: towerId => {
    return `${API_PATH}clustering/${towerId}`;
  },
  getGroups: towerId => {
    return `${API_PATH}clustering/groups/${towerId}`;
  }
};

export default AreaServiceDefinitions;
