import definitions from './Imports.definitions';
import Services from '../services';

export default class ClientsServices extends Services {
  getGroupTemplate(companyId) {
    return this.get(definitions.getGroupTemplate(companyId), {
      responseType: 'blob',
    });
  }

  postSchema(form, companyId) {
    return this.post(definitions.postSchema(companyId), form, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  }
}
