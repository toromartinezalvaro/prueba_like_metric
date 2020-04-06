import CompanyServiceDefinitions from './CompanyServicesDefinitions';
import Services from '../services';

export default class CompanyServices extends Services {
  create(company) {
    return this.post(CompanyServiceDefinitions.create, company);
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

  associatedProjects() {
    return this.get(CompanyServiceDefinitions.associated);
  }

  childrenInfo() {
    return this.get(CompanyServiceDefinitions.childrenInfo);
  }

  getCompanies() {
    return this.get(CompanyServiceDefinitions.getAllForUser);
  }

  getProjects() {
    return this.get(CompanyServiceDefinitions.getProjects);
  }
}
