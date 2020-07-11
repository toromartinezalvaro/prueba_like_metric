import definitions from './importServiceDefinitions';
import Services from '../services';

export default class ClientsServices extends Services {
  getContractFlowTemplate(towerId) {
    return this.get(definitions.getContractFlowTemplate(towerId), {
      responseType: 'blob',
    });
  }
}
