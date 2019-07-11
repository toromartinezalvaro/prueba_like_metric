import UserServiceDefinitions from './UserServiceDefinitions'
import agent from '../../config/config'
import axios from 'axios'
import Services from '../services'


export default class UserServices extends Services {

  constructor(delegate) {
    super(delegate)
    agent.reloadHeaderToken()
  }

  login(email, pass) {
    return new Promise((resolve, reject) => {
      axios
        .post(UserServiceDefinitions.login, { email: email, password: pass })
        .then(res => {
          if (res.status === 200) {
            agent.saveUser(res.data.user)
            resolve({
              email: res.data.user.email
            })
          } else {
            reject(res)
          }
        }).catch(error => {
          reject(error)
        })
    })
  }

  currentUser() {
    console.log("header ", axios.headers)
    return axios.get(UserServiceDefinitions.user)
  }

  logout() {
    return axios.post(UserServiceDefinitions.logout)
  }

  signup(data) {
    return this.post(UserServiceDefinitions.user, data)
  }

  childrenInfo() {
    return axios.get(UserServiceDefinitions.childrenInfo)
  }

}