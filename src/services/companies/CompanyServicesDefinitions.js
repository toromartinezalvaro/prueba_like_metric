import { API_PATH } from '../../config/config';

const CompanyServiceDefinitions = {
  create: `${API_PATH}companies`,
  createWithProject: `${API_PATH}companies/create-associate`,
  associate: `${API_PATH}companies/associate-project`,
  getAllForUser: `${API_PATH}companies/`,
  childrenInfo: `${API_PATH}user/allChildrenInfo`,
  getProjects: `${API_PATH}project/`,
};

export default CompanyServiceDefinitions;
