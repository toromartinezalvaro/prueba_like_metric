import { API_PATH } from '../../config/config';

const CompanyServiceDefinitions = {
  create: `${API_PATH}companies`,
  createWithProject: `${API_PATH}companies/create-associate`,
  associate: `${API_PATH}companies/associate-project`,
  getAllForUser: (userId) => `${API_PATH}companies/${userId}`,
  childrenInfo: `${API_PATH}user/allChildrenInfo`,
};

export default CompanyServiceDefinitions;
