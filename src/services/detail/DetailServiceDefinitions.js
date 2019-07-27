import { API_PATH } from '../../config/config'

const DetailServiceDefinitions = {
  details: towerId => `${API_PATH}detail/${towerId}`,
  excel: towerId => `${API_PATH}detail/excel/${towerId}`,

};

export default DetailServiceDefinitions