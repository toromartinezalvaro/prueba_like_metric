import UserServiceDefinitions from './UserServiceDefinitions'
import agent from '../config/config'
import axios from 'axios'


export default class UserServices {

  constructor() {
    agent.reloadHeaderToken()
  }

  devCatch(error) {
    console.log('User --> ', error)
  }

  login(email, pass) {
    return new Promise((resolve, reject) => {
      axios
        .post(UserServiceDefinitions.login, { email: email, password: pass })
        .then(res => {
          console.log("res--> ", res)
          if (res.status === 200) {
            agent.saveToken(res.data.user.token)
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

}