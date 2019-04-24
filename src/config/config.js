import axios from 'axios'

const jwtKey = 'jwt'

class Agent {

  constructor() {
    this.token = null
  }

  get currentToken() {
    return window.localStorage.getItem(jwtKey);
  }

  removeToken() {
    window.localStorage.setItem(jwtKey, '');
    this.token = ''
  }

  reloadHeaderToken() {
    this.setToken(this.currentToken);
  }

  saveToken(newToken) {
    this.setToken(newToken)
    window.localStorage.setItem(jwtKey, newToken);
  }

  setToken(newToken) { 
    this.token = newToken
    this.setupAxios(newToken)
  }

  setupAxios(currentToken) {
    if (currentToken !== undefined && currentToken !== "") {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + currentToken
      axios.defaults.withCredentials = true
      console.log("headers -->", axios.defaults.headers)
    } else {
      axios.defaults.headers.common['Authorization'] = ''
    }
  }
}

export const API_PATH = "http://localhost:1337/api/"
// export const API_PATH = "herokuproduction"
export default new Agent()