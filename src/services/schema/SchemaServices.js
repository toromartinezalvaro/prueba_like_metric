import SchemaServiceDefinitions from './SchemaServiceDefinitions';
import Services from '../services'


export default class SchemeServices extends Services  {

  getSchema(towerId) {
    return this.get(SchemaServiceDefinitions.schema(towerId))
  }

  postSchema(data) {
    console.log(SchemaServiceDefinitions.schema(""))
    return this.post(SchemaServiceDefinitions.schema(""), data)
  }

  putSchema(data) {
    return this.put(SchemaServiceDefinitions.schema(""), data)
  }

  putProperties(data) {
    return this.put(SchemaServiceDefinitions.properties, data)
  }

}