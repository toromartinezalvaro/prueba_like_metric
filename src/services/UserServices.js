import UserServiceDefinitions from './UserServiceDefinitions'
import axios from 'axios'


export default class UserServices {

  devCatch(error) {
    console.log('User --> ', error)
  }

  login(email, pass) {
    return axios.post(UserServiceDefinitions.login, { email: email, password: pass })
  }

}