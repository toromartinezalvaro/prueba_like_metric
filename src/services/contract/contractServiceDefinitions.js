import { API_PATH } from '../../config/config';

const ContractServiceDefinitions = {
  category: () => `${API_PATH}contract/contractcategory`,
  getAllCategories: () =>
    `${API_PATH}contract/contractcategory`,
  businessContract: () =>
    `${API_PATH}contract/businesspatner`,
  categoryToSearch: (categoryToSearch) => `${API_PATH}contract/contractcategory/${categoryToSearch}`,
  businessContractToSearch: (textToSearch) =>
    `${API_PATH}contract/${textToSearch}`,
  getAllPatners: () =>
    `${API_PATH}contract/businessPartner`,
  getCategoryById: (categoryToSearch) =>
    `${API_PATH}contract/contractcategory/find/${categoryToSearch}`,
};

export default ContractServiceDefinitions;
