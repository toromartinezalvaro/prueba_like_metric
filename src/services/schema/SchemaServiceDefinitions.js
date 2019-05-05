import { API_PATH } from '../../config/config'

const SchemaServiceDefinitions = {
  schema: towerId => { return `${API_PATH}schema/${towerId}`},
  properties: `${API_PATH}schema/properties`
};

export default SchemaServiceDefinitions