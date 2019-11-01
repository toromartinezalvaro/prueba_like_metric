import { API_PATH } from '../../config/config';

const ContractServiceDefinitions = {
  category: () => `${API_PATH}contract/contract-category`,
  getAllCategories: () => `${API_PATH}contract/contract-category`,
  businessContract: () => `${API_PATH}contract/business-partner`,
  categoryToSearch: (categoryToSearch) =>
    `${API_PATH}contract/contract-category/${categoryToSearch}`,
  businessContractToSearch: (textToSearch) =>
    `${API_PATH}contract/${textToSearch}`,
  getAllPatners: () => `${API_PATH}contract/business-partner`,
  getCategoryById: (categoryToSearch) =>
    `${API_PATH}contract/contract-category/find/${categoryToSearch}`,
  getPartnerById: (partnerToSearch) =>
    `${API_PATH}contract/business-partner/find/${partnerToSearch}`,
  categoryUpdate: () => `${API_PATH}contract/contract-category/edit`,
  partnerUpdate: () => `${API_PATH}contract/business-partner/edit`,
};

export default ContractServiceDefinitions;
