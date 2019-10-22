import { API_PATH } from '../../config/config';

const ContractServiceDefinitions = {
  category: contractcategory => `${API_PATH}contract/${contractcategory}`,
  businessContact: contractBusinessPatner => `${API_PATH}contract/${contractBusinessPatner}`,
}

export default ContractServiceDefinitions;