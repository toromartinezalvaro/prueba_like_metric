import axios from 'axios';
import agent from '../config/config';
import UserServices from './user/UserServiceDefinitions';

class Services {
  constructor() {
    this.axios = axios;
    axios.defaults.timeout = 1000 * 40;
    Services.setupAuthentication();
  }

  post(url, data, config) {
    console.log('url 🐒 post', url);
    return this.axiosPromise(() => this.axios.post(url, data, config));
  }

  put(url, data, config) {
    console.log('url 🐒 put', url);
    return this.axiosPromise(() => this.axios.put(url, data, config));
  }

  get(url, config) {
    console.log('url 🐒 get', url, this.axios.defaults.headers);
    return this.axiosPromise(() => this.axios.get(url, config));
  }

  download(url, data, config) {
    console.log('url 🐒 get', url);
    return this.axiosPromise(() => this.axios.get(url, data, config));
  }

  delete(url, data, config) {
    console.log('url 🐒 delete', url);
    const newConfig = {
      ...config,
      data,
    };
    return this.axiosPromise(() => this.axios.delete(url, newConfig));
  }

  renewToken(promise, resolve, reject) {
    agent.reloadCurrentUser();
    const { refreshToken } = agent.currentUser;
    this.axios
      .post(UserServices.renewToken, { refreshToken }, { timeout: 1000 * 80 })
      .then((response) => {
        if (response.data.token) {
          agent.saveUser(response.data);
          this.axiosPromise(promise, 2, false)
            .then(resolve)
            .catch(reject);
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          agent.logout();
          window.location.reload();
        }
        reject(error);
      });
  }

  axiosPromise(promise, retry = 2, isAuthorizationEnabled = true) {
    return new Promise((resolve, reject) => {
      promise()
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          if (error.response && error.response.status === 401) {
            if (
              agent.currentUser &&
              agent.currentUser.refreshToken &&
              isAuthorizationEnabled
            ) {
              this.renewToken(promise, resolve, reject);
              return;
            }

            agent.logout();
            window.location.reload();
            reject(error);
          } else if (
            retry >= 1 &&
            retry < 5 &&
            ((error.response &&
              error.response.status !== 404 &&
              error.response.status !== 400) ||
              !error.response)
          ) {
            const newRetry = retry - 1;
            this.axiosPromise(promise, newRetry)
              .then(resolve)
              .catch(reject);
          } else {
            const errorObject = error.response
              ? error.response.data
              : { message: 'Ha ocurrido un error' };
            reject(errorObject);
          }
        });
    });
  }

  static setupAuthentication() {
    const { currentToken } = agent;
    if (currentToken !== undefined && currentToken !== '') {
      axios.defaults.headers.common.Authorization = `Bearer ${currentToken}`;
      axios.defaults.withCredentials = true;
    } else {
      axios.defaults.headers.common.Authorization = '';
    }
  }
}

export default Services;
