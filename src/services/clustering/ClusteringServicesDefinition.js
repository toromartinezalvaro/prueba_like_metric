import { API_PATH } from "../../config/config";

const AreaServiceDefinitions = {
  clusterize: () => {
    return `${API_PATH}clustering/`;
  },
  getClusters: towerId => {
    return `${API_PATH}clustering/${towerId}`;
  }
};

export default AreaServiceDefinitions;
