/*
 * Created by Jcatman on Fri Nov 01 2019
 *
 * Copyright (c) 2019 Instabuild
 */

import ContractServiceDefinitions from './contractServiceDefinitions';
import Services from '../services';

export default class ContractService extends Services {
  postCategoryContracts(data) {
    return this.post(ContractServiceDefinitions.category(), data);
  }

  postOrganizationUnit(data) {
    console.log('Las datas fueron', data);
    return this.post(ContractServiceDefinitions.organizationUnit(), data);
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

  getOrganizationUnitById(organizationToSearch) {
    return this.get(
      ContractServiceDefinitions.getOrganizationUnitById(organizationToSearch),
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

  getAllOrganizationUnit() {
    return this.get(ContractServiceDefinitions.getAllOrganizationUnit());
  }

  putBusinessPartner(data) {
    return this.put(ContractServiceDefinitions.partnerUpdate(), data);
  }

  putCategoryContracts(data) {
    return this.put(ContractServiceDefinitions.categoryUpdate(), data);
  }

  putOrganizationUnit(data) {
    return this.put(ContractServiceDefinitions.organizationUnitUpdate(), data);
  }

  postImages(data) {
    return this.post(ContractServiceDefinitions.uploadImage(), data);
  }
}
