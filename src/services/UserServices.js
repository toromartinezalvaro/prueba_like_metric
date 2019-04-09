import UserServiceDefinitions from './UserServiceDefinitions'
import axios from 'axios'


export default class UserServices {

  devCatch(error) {
    console.log('User --> ', error)
  }

  login() {
    return axios.post(UserServiceDefinitions.login)
  }

}