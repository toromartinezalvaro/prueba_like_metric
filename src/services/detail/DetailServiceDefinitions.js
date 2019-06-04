import { API_PATH } from '../../config/config'

const DetailServiceDefinitions = {
  details: towerId => `${API_PATH}detail/${towerId}`,
};

export default DetailServiceDefinitions