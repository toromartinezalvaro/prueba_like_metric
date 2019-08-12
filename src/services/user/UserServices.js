import axios from 'axios';
import UserServiceDefinitions from './UserServiceDefinitions';
import ProjectServiceDefinitions from '../Projects/ProjectServiceDefinitions';
import agent from '../../config/config';
import Services from '../services';

export default class UserServices extends Services {
  constructor(delegate) {
    super(delegate);
    agent.reloadHeaderToken();
  }

  login(email, pass) {
    return new Promise((resolve, reject) => {
      axios
        .post(UserServiceDefinitions.login, { email, password: pass })
        .then((res) => {
          if (res.status === 200) {
            // agent.saveUser(res.data.user)
            resolve(res.data.user);
          } else {
            reject(res);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  currentUser() {
    console.log('header ', axios.headers);
    return axios.get(UserServiceDefinitions.user);
  }

  logout() {
    return axios.post(UserServiceDefinitions.logout);
  }

  signup(data) {
    return this.post(UserServiceDefinitions.user, data);
  }

  childrenInfo() {
    return this.get(UserServiceDefinitions.childrenInfo);
  }

  removeProjectForUser(data) {
    return this.delete(ProjectServiceDefinitions.removeWithUser, data);
  }

  addProjectToUser(data) {
    return this.post(ProjectServiceDefinitions.addToUser, data);
  }

  updatePassword(data) {
    return this.put(UserServiceDefinitions.updatePassword, data);
  }

  updatePasswordFromAdmin(data) {
    return this.put(UserServiceDefinitions.updatePasswordFromAdmin, data);
  }
}
