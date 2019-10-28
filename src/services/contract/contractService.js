import ContractServiceDefinitions from './contractServiceDefinitions';
import Services from '../services';

export default class ContractService extends Services {
  postCategoryContracts(contractcategory, data) {
    return this.post(
      ContractServiceDefinitions.category(contractcategory),
      data,
    );
  }

  postBusinessPatnerContract(contractBusinessPatner, data) {
    console.log(data);
    return this.post(
      ContractServiceDefinitions.businessContract(contractBusinessPatner),
      data,
    );
  }

  getCategoryToSearch(textToSearch) {
    return this.get(ContractServiceDefinitions.categoryToSearch(textToSearch));
  }

  getAllCategories(contractcategory) {
    return this.get(
      ContractServiceDefinitions.getAllCategories(contractcategory),
    );
  }

  getBusinessPatnerToSearch(textToSearch) {
    return this.get(
      ContractServiceDefinitions.businessContractToSearch(textToSearch),
    );
  }

  getAllPatners(businessPartner) {
    return this.get(ContractServiceDefinitions.getAllPatners(businessPartner));
  }
}
