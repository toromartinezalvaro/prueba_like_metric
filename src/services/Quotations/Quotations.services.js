import definitions from './Quotations.definitions';
import Services from '../services';

export default class ClientsServices extends Services {
  postTempQuotation(quotation, towerId) {
    return this.post(definitions.postTempQuotation(towerId), quotation);
  }

  putQuotationToPermanent(quotationId) {
    return this.put(definitions.putQuotationToPermanent(quotationId));
  }

  getClientQuotations(clientId) {
    return this.get(definitions.getClientQuotations(clientId));
  }

  getQuotation(quotationId) {
    return this.get(definitions.getQuotation(quotationId));
  }

  deleteQuotation(quotationId) {
    return this.delete(definitions.deleteQuotation(quotationId));
  }
}
