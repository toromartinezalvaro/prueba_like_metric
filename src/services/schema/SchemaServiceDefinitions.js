import { API_PATH } from '../../config/config'

const SchemaServiceDefinitions = {
  schema: towerId => { return `${API_PATH}schema/${towerId}`},
  properties: `${API_PATH}schema/properties`,
  deleteProperties: id => { return `${API_PATH}schema/properties/${id}`},
  putStratum: towerId => `${API_PATH}schema/stratums/${towerId}`
};

export default SchemaServiceDefinitions