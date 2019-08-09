import axios from 'axios';
import Server from './server';
const env = process.env.NODE_ENV || 'development';
const config = require('./server')[env];

const jwtKey = 'jwt';

class Agent {
  constructor() {
    this.token = null;
    this.user = null;
    this.reloadCurrentUser();
  }

  get currentUser() {
    if (this.user) {
      return this.user;
    } else {
      return this.reloadCurrentUser();
    }
  }

  get currentToken() {
    if (this.token) {
      return this.token;
    } else {
      const user = this.reloadCurrentUser();
      return user ? user.token : null;
    }
  }

  isAuthorized(roles) {
    return (
      roles &&
      this.currentUser &&
      roles.indexOf(this.currentUser.userType) !== -1
    );
  }

  reloadCurrentUser() {
    if (this.user === null || this.token === null) {
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
    this.setupAxios(newToken);
  }

  setupAxios(currentToken) {
    if (currentToken !== undefined && currentToken !== '') {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + currentToken;
      axios.defaults.withCredentials = true;
    } else {
      axios.defaults.headers.common['Authorization'] = '';
    }
  }
}

// export const API_PATH = Server.development.serverUrl
export const API_PATH = config.serverUrl;
export default new Agent();
