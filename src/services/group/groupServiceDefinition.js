import { API_PATH } from '../../config/config';

const groupServiceDefinition = {
  groupBase: () => `${API_PATH}contract/contract-category-group`,
  itemBase: () => `${API_PATH}contract/item-controll`,
};
export default groupServiceDefinition;
