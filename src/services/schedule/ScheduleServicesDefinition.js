import { API_PATH } from '../../config/config';

const IncrementsServiceDefinition = {
  getDates: (towerId) => {
    return `${API_PATH}schedules/${towerId}`;
  },

  putSalesStartDate: (towerId) => {
    return `${API_PATH}schedules/salesStartDates/${towerId}`;
  },

  putBalancePointDate: (towerId) => {
    return `${API_PATH}schedules/balancePointDate/${towerId}`;
  },

  putConstructionStartDate: (towerId) => {
    return `${API_PATH}schedules/constructionStartDate/${towerId}`;
  },

  putAverageDeliveryDate: (towerId) => {
    return `${API_PATH}schedules/averageDeliveryDate/${towerId}`;
  },

  putEndOfSalesDate: (towerId) => {
    return `${API_PATH}schedules/endOfSalesDate/${towerId}`;
  },

  putFirstSaleHandler: (towerId) => {
    return `${API_PATH}schedules/firstSales/${towerId}`;
  },
};

export default IncrementsServiceDefinition;
