import { API_PATH } from '../../config/config'

const UserServiceDefinitions = Object.freeze({
  login: `${API_PATH}user/login`,
  signup: `${API_PATH}user`,
  user: `${API_PATH}user`,
  logout: `${API_PATH}user/logout`,
  childrenInfo: `${API_PATH}user/allChildrenInfo`,
  updatePassword: `${API_PATH}user/updatePassword`,
  updatePasswordFromAdmin: `${API_PATH}user/updatePasswordFromAdmin`,
});

export default UserServiceDefinitions