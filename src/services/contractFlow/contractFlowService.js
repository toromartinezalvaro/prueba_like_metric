/*
 * Created by Jcatman on Fri Dec 20 2019
 *
 * Copyright (c) 2019 Instabuild
 */

import ContractFlowServiceDefinitions from './contractFlowServiceDefinition';
import Services from '../services';

export default class ContractFlowService extends Services {
  getContractsInformation(towerId) {
    return this.get(
      ContractFlowServiceDefinitions.getContractsInformation(towerId),
    );
  }
}
