/*
 * Created by Jcatman on Fri Nov 01 2019
 *
 * Copyright (c) 2019 Instabuild
 */

import { API_PATH } from '../../config/config';
import BillingFinancials from '../../components/Contracts/NewContract/Content/BillingFinancials/BillingFinancials';

const ContractServiceDefinitions = {
  contract: (towerId) => `${API_PATH}contract/${towerId}`,
  contractForEdition: (towerId, id) => `${API_PATH}contract/${towerId}/${id}`,
  contractForDelete: (towerId) => `${API_PATH}contract/${towerId}`,
  category: (towerId) => `${API_PATH}contract/contract-category/${towerId}`,
  getAllCategories: (towerId) =>
    `${API_PATH}contract/contract-category/${towerId}`,
  businessContract: (towerId) =>
    `${API_PATH}contract/business-partner/${towerId}`,
  categoryToSearch: (categoryToSearch) =>
    `${API_PATH}contract/contract-category/${categoryToSearch}`,
  businessContractToSearch: (textToSearch) =>
    `${API_PATH}contract/${textToSearch}`,
  getAllPatners: (towerId) => `${API_PATH}contract/business-partner/${towerId}`,
  getCategoryById: (categoryToSearch) =>
    `${API_PATH}contract/contract-category/find/${categoryToSearch}`,
  organizationUnit: () => `${API_PATH}contract/organization-unit`,
  getAllOrganizationUnit: () => `${API_PATH}contract/organization-unit`,
  getOrganizationUnitById: (organizationToSearch) =>
    `${API_PATH}contract/organization-unit/find/${organizationToSearch}`,
  getPartnerById: (partnerToSearch) =>
    `${API_PATH}contract/business-partner/find/${partnerToSearch}`,
  categoryUpdate: () => `${API_PATH}contract/contract-category/edit`,
  partnerUpdate: () => `${API_PATH}contract/business-partner/edit`,
  organizationUnitUpdate: () => `${API_PATH}contract/organization-unit/edit`,
  uploadAttachment: () => `${API_PATH}contract/upload-attachment`,
  items: () => `${API_PATH}contract/item`,
  getItemById: (data) => `${API_PATH}contract/item/find/${data}`,
  itemUpdate: () => `${API_PATH}contract/item/edit`,
  findByForeignId: (towerId, data) =>
    `${API_PATH}contract/item-group/${towerId}/${data}`,
  contractById: (towerId, id) => `${API_PATH}contract/${towerId}/${id}`,
  toDeleteBill: (towerId) => `${API_PATH}contract/bill/${towerId}`,
  toDeleteAttach: (path) => `${API_PATH}contract/attach/${path}`,
};

export default ContractServiceDefinitions;
