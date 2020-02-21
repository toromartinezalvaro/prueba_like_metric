import { API_PATH } from '../../config/config';

const QUOTATIONS = 'quotations';

const ClientsServiceDefinitions = {
  postTempQuotation: (towerId) => `${API_PATH}${QUOTATIONS}/towers/${towerId}`,
  putQuotationToPermanent: (quotationId) =>
    `${API_PATH}${QUOTATIONS}/${quotationId}`,
  getClientQuotations: (clientId) =>
    `${API_PATH}${QUOTATIONS}/clients/${clientId}`,
  getQuotation: (quotationId) => `${API_PATH}${QUOTATIONS}/${quotationId}`,
};

export default ClientsServiceDefinitions;
