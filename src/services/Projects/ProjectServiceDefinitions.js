import { API_PATH } from '../../config/config'

const ProjectServiceDefinitions = {
  projects: `${API_PATH}project/`,
  removeWithUser: `${API_PATH}project/removeWithUser`,
  addToUser: `${API_PATH}project/addToUser`,
};

export default ProjectServiceDefinitions