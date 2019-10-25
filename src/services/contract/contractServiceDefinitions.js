import { API_PATH } from '../../config/config';

const ContractServiceDefinitions = {
  category: contractcategory => `${API_PATH}contract/${contractcategory}`,
  getAllCategories: contractcategory => `${API_PATH}contract/${contractcategory}`,
  businessContract: contractBusinessPatner => `${API_PATH}contract/${contractBusinessPatner}`,
  categoryToSearch: textToSearch => `${API_PATH}contract/${textToSearch}`,
  businessContractToSearch: textToSearch => `${API_PATH}contract/${textToSearch}`,
}

export default ContractServiceDefinitions;