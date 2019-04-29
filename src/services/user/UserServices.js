import UserServiceDefinitions from './UserServiceDefinitions'
import agent from '../../config/config'
import Services from '../services';

export default class UserServices extends Services {

  login(email, pass) {
    return new Promise((resolve, reject) => {
      this
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
    return this.get(UserServiceDefinitions.user)
  }

  logout() {
    return this.post(UserServiceDefinitions.logout)
  }

}