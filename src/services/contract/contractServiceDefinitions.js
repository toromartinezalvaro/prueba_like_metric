import { API_PATH } from '../../config/config';

const ContractServiceDefinitions = {
  category: () => `${API_PATH}contract/contractCategory`,
  getAllCategories: () => `${API_PATH}contract/contractCategory`,
  businessContract: () => `${API_PATH}contract/businesspartner`,
  categoryToSearch: (categoryToSearch) =>
    `${API_PATH}contract/contractcategory/${categoryToSearch}`,
  businessContractToSearch: (textToSearch) =>
    `${API_PATH}contract/${textToSearch}`,
  getAllPatners: () => `${API_PATH}contract/businessPartner`,
  getCategoryById: (categoryToSearch) =>
    `${API_PATH}contract/contractCategory/find/${categoryToSearch}`,
  getPartnerById: (partnerToSearch) =>
    `${API_PATH}contract/businessPartner/find/${partnerToSearch}`,
  categoryUpdate: () => `${API_PATH}contract/contractCategory/edit`,
  partnerUpdate: () => `${API_PATH}contract/businessPartner/edit`,
};

export default ContractServiceDefinitions;
