import definitions from './Imports.definitions';
import Services from '../services';

export default class ClientsServices extends Services {
  getSchemaTemplate(towerId) {
    return this.get(definitions.getSchemaTemplate(towerId), {
      responseType: 'blob',
    });
  }

  getNomenclatureTemplate(towerId) {
    return this.get(definitions.getNomenclatureTemplate(towerId), {
      responseType: 'blob',
    });
  }

  postSchema(towerId, form) {
    return this.post(definitions.postSchema(towerId), form, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  }

  postNomenclature(towerId, form) {
    return this.post(definitions.postNomenclature(towerId), form, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  }

  getTowerInfo(towerId) {
    return this.get(definitions.getTowerInfo(towerId));
  }
}
