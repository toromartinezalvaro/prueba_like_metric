import definitions from './Imports.definitions';
import Services from '../services';

export default class ClientsServices extends Services {
  getGroupTemplate(companyId) {
    return this.get(definitions.getGroupTemplate(companyId), {
      responseType: 'blob',
    });
  }

  postSchema(towerId, form) {
    return this.post(definitions.postSchema(), form, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  }
}
