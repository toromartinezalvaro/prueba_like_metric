import SchemaServiceDefinitions from './SchemaServiceDefinitions';
import Services from '../services';

export default class SchemeServices extends Services {
  getSchema(towerId) {
    return this.get(SchemaServiceDefinitions.schema(towerId));
  }

  postSchema(data) {
    console.log(SchemaServiceDefinitions.schema(''));
    return this.post(SchemaServiceDefinitions.schema(''), data);
  }

  putSchema(data) {
    return this.put(SchemaServiceDefinitions.schema(''), data);
  }

  putProperties(data) {
    return this.put(SchemaServiceDefinitions.properties, data);
  }

  deleteProperties(id) {
    return this.delete(SchemaServiceDefinitions.deleteProperties(id));
  }

  putStratum(id, body) {
    return this.put(SchemaServiceDefinitions.putStratum(id), body);
  }

  putSalesStartDate(towerId, body) {
    return this.put(SchemaServiceDefinitions.putSalesStartDate(towerId), body);
  }

  putEndOfSalesDate(towerId, body) {
    return this.put(SchemaServiceDefinitions.putEndOfSalesDate(towerId), body);
  }

  isDisable(towerId) {
    return this.get(SchemaServiceDefinitions.getSalesRequestHistory(towerId));
  }
}
