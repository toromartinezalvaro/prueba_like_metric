import axios from 'axios';
import Server from './server';
import Config from '.';

const jwtKey = 'jwt';

class Agent {
  constructor() {
    if (!Agent.instance) {
      this.token = null;
      this.user = null;
      this.reloadCurrentUser();
      Agent.instance = this;
    }
    this.reloadCurrentUser();
    return Agent.instance;
  }

  get currentUser() {
    if (this.user) {
      return this.user;
    }
    return this.reloadCurrentUser();
  }

  get currentToken() {
    if (this.token) {
      return this.token;
    }
    const user = this.currentUser;
    return user ? user.token : null;
  }

  isAuthorized(roles) {
    return (
      roles &&
      this.currentUser &&
      roles.indexOf(this.currentUser.userType) !== -1
    );
  }

  reloadCurrentUser() {
    try {
      const user = JSON.parse(window.localStorage.getItem(jwtKey));
      if (user && user.token) {
        this.user = user;
        this.setToken(user.token);
      } else {
        this.logout();
      }
      return user;
    } catch {
      this.logout();
      return null;
    }
  }

  logout() {
    window.localStorage.setItem(jwtKey, null);
    this.token = null;
    this.user = null;
  }

  reloadHeaderToken() {
    this.setToken(this.currentToken);
  }

  saveUser(newUser) {
    this.setToken(newUser.token);
    this.user = newUser;
    window.localStorage.setItem(jwtKey, JSON.stringify(newUser));
  }

  setToken(newToken) {
    this.token = newToken;
    Agent.setupAxios(newToken);
  }

  static setupAxios(currentToken) {
    if (currentToken !== undefined && currentToken !== '') {
      axios.defaults.headers.common.Authorization = `Bearer ${currentToken}`;
      axios.defaults.withCredentials = true;
    } else {
      axios.defaults.headers.common.Authorization = '';
    }
  }
}

export const API_PATH = Config.server.serverUrl;

const instance = new Agent();
// export singleton freezed object
export default instance;
