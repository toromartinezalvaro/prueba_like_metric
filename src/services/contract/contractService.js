import ContractServiceDefinitions from './contractServiceDefinitions';
import Services from '../services';

export default class ContractService extends Services {
  postCategoryContracts(data) {
    return this.post(ContractServiceDefinitions.category(), data);
  }

  postBusinessPatnerContract(data) {
    return this.post(ContractServiceDefinitions.businessContract(), data);
  }

  getCategoryToSearch(categoryToSearch) {
    return this.get(
      ContractServiceDefinitions.categoryToSearch(categoryToSearch),
    );
  }

  getAllCategories() {
    return this.get(ContractServiceDefinitions.getAllCategories());
  }

  getCategoryById(categoryToSearch) {
    return this.get(
      ContractServiceDefinitions.getCategoryById(categoryToSearch),
    );
  }

  getPartnerById(partnerToSearch) {
    return this.get(ContractServiceDefinitions.getPartnerById(partnerToSearch));
  }

  getBusinessPatnerToSearch(textToSearch) {
    return this.get(
      ContractServiceDefinitions.businessContractToSearch(textToSearch),
    );
  }

  getAllPatners() {
    return this.get(ContractServiceDefinitions.getAllPatners());
  }

  putBusinessPartner(data) {
    return this.put(ContractServiceDefinitions.partnerUpdate(), data);
  }

  putCategoryContracts(data) {
    return this.put(ContractServiceDefinitions.categoryUpdate(), data);
  }
}
