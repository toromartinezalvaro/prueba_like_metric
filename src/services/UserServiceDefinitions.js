import { API_PATH } from '../config/config'


export default UserServiceDefinitions = Object.freeze({
    login: `${API_PATH}/user/login`,
    signup: `${API_PATH}/user`
});