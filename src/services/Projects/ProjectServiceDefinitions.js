import { API_PATH } from '../../config/config';

const ProjectServiceDefinitions = {
  projects: `${API_PATH}project/`,
  removeWithUser: `${API_PATH}project/removeWithUser`,
  addToUser: `${API_PATH}project/addToUser`,
  updateProject: (id) => `${API_PATH}project/${id}`,
};

export default ProjectServiceDefinitions;
