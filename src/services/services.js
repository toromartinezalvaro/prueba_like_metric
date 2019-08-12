import axios from 'axios';
import agent from '../config/config';

class Services {
  constructor() {
    this.axios = axios;
    axios.defaults.timeout = 1000 * 15;
    this.setupAuthentication();
  }

  post(url, data, config) {
    console.log('url 🐒 post', url);
    return this.axiosPromise(() => this.axios.post(url, data, config));
  }

  put(url, data, config) {
    console.log('url 🐒 put', url);
    return this.axiosPromise(() => this.axios.put(url, data, config));
  }

  get(url, data, config) {
    console.log('url 🐒 get', url, this.axios.defaults.headers);
    return this.axiosPromise(() => this.axios.get(url, data, config));
  }

  download(url, data, config) {
    console.log('url 🐒 get', url);
    return this.axiosPromise(() => this.axios.get(url, data, config));
  }

  delete(url, data, config) {
    console.log('url 🐒 delete', url);
    let newConfig = {
      ...config,
      data: data,
    };
    return this.axiosPromise(() => this.axios.delete(url, newConfig));
  }

  axiosPromise(promise) {
    return new Promise((resolve, reject) => {
      promise()
        .then((response) => {
          console.log('DONE -->', response);
          resolve(response);
        })
        .catch((error) => {
          // if (this.delegate === undefined) {
          //   reject(new Error('Should set delegate'));
          //   return;
          // }
          if (error.response && error.response.status === 401) {
            // if (this.delegate.executeNoAuthorization) {
            //   this.delegate.executeNoAuthorization();
            // }
            agent.logout();
            window.location.reload();
            console.log('error -->', error.response.status);
          }

          reject(error);
        });
    });
  }

  setupAuthentication() {
    const currentToken = agent.currentToken;
    if (currentToken !== undefined && currentToken !== '') {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + currentToken;
      axios.defaults.withCredentials = true;
    } else {
      axios.defaults.headers.common['Authorization'] = '';
    }
  }
}

export default Services;
