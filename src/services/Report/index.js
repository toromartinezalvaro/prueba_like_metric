import ServiceDefinitions from './ServiceDefinitions';
import Services from '../services';

class ReportServices extends Services {
  getReport(towerId) {
    return this.get(ServiceDefinitions.getReport(towerId));
  }
}

export default ReportServices;
