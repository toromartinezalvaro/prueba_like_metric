import { API_PATH } from '../../config/config';

const IncrementsServiceDefinition = {
  getDates: (towerId) => {
    return `${API_PATH}schedules/${towerId}`;
  },

  putSalesStartDate: (towerId) => {
    return `${API_PATH}schedules/sales-start-dates/${towerId}`;
  },

  putBalancePointDate: (towerId) => {
    return `${API_PATH}schedules/balance-point-date/${towerId}`;
  },

  putConstructionStartDate: (towerId) => {
    return `${API_PATH}schedules/construction-start-date/${towerId}`;
  },

  putAverageDeliveryDate: (towerId) => {
    return `${API_PATH}schedules/average-delivery-date/${towerId}`;
  },

  putEndOfSalesDate: (towerId) => {
    return `${API_PATH}schedules/end-of-sales-date/${towerId}`;
  },

  putMaximumCollectionDate: (towerId) => {
    return `${API_PATH}schedules/maximum-collection-date/${towerId}`;
  },

  putFirstSaleHandler: (towerId) => {
    return `${API_PATH}schedules/first-sales/${towerId}`;
  },
};

export default IncrementsServiceDefinition;
