// import { API_PATH } from '../../config/config'
export const API_PATH = "http://localhost:1337/"

const SchemaServiceDefinitions = {
  schema: towerId => { return `${API_PATH}schema/${towerId}`},
  properties: `${API_PATH}schema/properties`
};

export default SchemaServiceDefinitions