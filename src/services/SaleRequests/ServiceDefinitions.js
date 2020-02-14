import { API_PATH } from '../../config/config';

const ServiceDefinitions = {
  getSaleRequests: (towerId) => {
    return `${API_PATH}sale-requests/tower/${towerId}`;
  },
  getSaleRequest: (id) => {
    return `${API_PATH}sale-requests/${id}`;
  },

  putSaleRequest: (id) => {
    return `${API_PATH}sale-requests/${id}`;
  },

  putPriceProperty: (id) => {
    return `${API_PATH}sale-requests/price-property/${id}`;
  },
};

export default ServiceDefinitions;
