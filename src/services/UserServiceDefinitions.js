import { API_PATH } from '../config/config'

const UserServiceDefinitions = Object.freeze({
  login: `${API_PATH}user/login`,
  signup: `${API_PATH}user`,
  user: `${API_PATH}user`,
  logout: `${API_PATH}user/logout`
});

export default UserServiceDefinitions