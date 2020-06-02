import ProjectServiceDefinitions from './ProjectServiceDefinitions';
import Services from '../services';

export default class ProjectServices extends Services {
  getProjects() {
    return this.get(ProjectServiceDefinitions.projects);
  }

  createProject(data) {
    return this.post(ProjectServiceDefinitions.projects, data);
  }

  removeProject(data) {
    return this.delete(ProjectServiceDefinitions.projects, data);
  }

  updateProject = (id, data) => {
    return this.put(ProjectServiceDefinitions.updateProject(id), data);
  };
}
