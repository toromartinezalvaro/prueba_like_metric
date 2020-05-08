import definitions from './Imports.definitions';
import Services from '../services';

export default class ClientsServices extends Services {
  getSchemaTemplate(towerId) {
    return this.get(definitions.getSchemaTemplate(towerId));
  }

  postSchema(towerId, form) {
    return this.post(definitions.postSchema(towerId), form, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  }
}
