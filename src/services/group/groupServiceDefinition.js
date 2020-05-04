import { API_PATH } from '../../config/config';

const groupServiceDefinition = {
  groupBaseGet: (data) => `${API_PATH}contract/contract-category-group/${data}`,
  groupBase: () => `${API_PATH}contract/contract-category-group`,
  itemBase: () => `${API_PATH}contract/item-controll`,
  companyBase: () => `${API_PATH}contract/contract-company-group`,
};
export default groupServiceDefinition;
