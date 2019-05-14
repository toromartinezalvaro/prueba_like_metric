import React, { Component } from 'react';
import UserServices from '../../services/user/UserServices'
import agent from '../../config/config'
import User from '../../components/User/User'
import { UserRoutes } from '../../routes/local/routes'

export default class UserSettings extends Component {

  constructor(props) {
    super(props)
    this.services = new UserServices(this)
  }

  state = {
    isLoading: false,
    user: {}
  }

  componentDidMount() {
    if (this.props.additionalProps) {
      this.props.additionalProps.changeTower(null)
    }
    this.loadCurrentUserInfo()
  }

  logoutAction = () => {
    console.log("log out")
    this.services
    .logout()
    .then(response => {
      if (response.status === 200) {
        agent.removeToken()
        this.props.history.push(UserRoutes.login)
      } 
    })
    .catch(error => {
      console.log("error ---> ", error)
    })
  }

  loadCurrentUserInfo = () => {
    if (agent.currentToken) {
      this.setState({
        isLoading: true
      })

      this.services
        .currentUser()
        .then(response => {
          var user = {}
          if (response.data.user) {
            user = response.data.user
          }
          this.setState({ isLoading: false, user: user })
        })
        .catch(error => {
          this.setState({
            isLoading: false
          })
        })
    } else {
      this.setState({ isLoading: false })
    }
  }


  render() {
    return ( 
      <User 
        isLoading= {this.state.isloading}
        user= {this.state.user}
        logoutAction= {this.logoutAction}
      />
    )
  }

}