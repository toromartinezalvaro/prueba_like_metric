/*
 * Created by Jcatman on Fri Nov 01 2019
 *
 * Copyright (c) 2019 Instabuild
 */

import ContractServiceDefinitions from './contractServiceDefinitions';
import Services from '../services';

export default class ContractService extends Services {
  postCategoryContracts(data, towerId) {
    return this.post(ContractServiceDefinitions.category(towerId), data);
  }

  postOrganizationUnit(data) {
    return this.post(ContractServiceDefinitions.organizationUnit(), data);
  }

  postBusinessPatnerContract(data, towerId) {
    return this.post(ContractServiceDefinitions.businessContract(towerId), data);
  }

  getCategoryToSearch(categoryToSearch) {
    return this.get(
      ContractServiceDefinitions.categoryToSearch(categoryToSearch),
    );
  }

  getAllCategories(towerId) {
    return this.get(ContractServiceDefinitions.getAllCategories(towerId));
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

  getAllPatners(towerId) {
    return this.get(ContractServiceDefinitions.getAllPatners(towerId));
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

  postAttachment(data) {
    return this.post(ContractServiceDefinitions.uploadAttachment(), data);
  }

  getAllItems() {
    return this.get(ContractServiceDefinitions.items());
  }

  postItem(data) {
    return this.post(ContractServiceDefinitions.items(), data);
  }

  getItemById(data) {
    return this.get(ContractServiceDefinitions.getItemById(data));
  }

  updateItem(data) {
    return this.put(ContractServiceDefinitions.itemUpdate(), data);
  }

  findByForeignId(data) {
    return this.get(ContractServiceDefinitions.findByForeignId(data));
  }

  postContract(data, towerId) {
    return this.post(ContractServiceDefinitions.contract(towerId), data, {
      headers: {
        'content-type': 'multipart/form-data',
      },
    });
  }

  getContractById(towerId, id) {
    return this.get(ContractServiceDefinitions.contractById(towerId, id));
  }

  getAllContracts(towerId) {
    return this.get(ContractServiceDefinitions.contract(towerId));
  }
}
