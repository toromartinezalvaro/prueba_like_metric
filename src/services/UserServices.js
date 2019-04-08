import UserServiceDefinitions from './UserServiceDefinitions'
import axios from 'axios'


export default class UserServices {


  devCatch(error) {
    console.log('User --> ', error)
  }

  login() {
    axios.post(UserServiceDefinitions.login)
      .then(response => {
        
      })
      .catch(this.devCatch)
  }
}