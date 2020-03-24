import CompanyServiceDefinitions from './CompanyServicesDefinitions';
import Services from '../services';

export default class CompanyServices extends Services {
  create(name) {
    return this.post(CompanyServiceDefinitions.create, { name });
  }

  createWithProject(name, projectId) {
    return this.post(CompanyServiceDefinitions.createWithProject, {
      name,
      projectId,
    });
  }

  associateWithProject(companyId, projectId) {
    return this.post(CompanyServiceDefinitions.associate, {
      companyId,
      projectId,
    });
  }

  childrenInfo() {
    return this.get(CompanyServiceDefinitions.childrenInfo);
  }

  getCompanies(userId) {
    return this.get(CompanyServiceDefinitions.getAllForUser(userId));
  }
}
