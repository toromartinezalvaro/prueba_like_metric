import React, { Component } from 'react';
import Services from '../../services/user/UserServices'
import { CreateUserForm } from '../../components/User';
import Loader from 'react-loader-spinner'
import agent from '../../config/config'
import { DashboardRoutes, ProjectRoutes } from '../../routes/local/routes'
import styles from './CreateUser.module.scss'
import errorHandling from '../../services/commons/errorHelper'
import {Role} from "../../helpers"

class CreateUser extends Component {

  constructor(props) {
    super(props)
    this.services = new Services(this)
  }

  state = {
    role: Role.User,
    name: "",
    email: "",
    password: "",
    currentErrorMessage: "",
    isLoading: false
  }

  componentDidMount() {
    // this.loadCurrentUserInfo()
  }

  onChange = target => {
    const { name, value } = target
    if (name && value) {
      this.setState({
        [name]: value
      })
    }
  }

  loadCurrentUserInfo = () => {
    if (agent.currentToken) {
      this.setState({
        isLoading: true
      })

      this.services
        .currentUser()
        .then(response => {
          if (response.data.user) {
            this.props.history.push(DashboardRoutes.base + ProjectRoutes.base)
          } else {
            agent.logout()
          }
          this.setState({ isLoading: false })
        })
        .catch(error => {
          agent.logout()
          this.setState({
            isLoading: false
          })
        })
    } else {
      this.setState({ isLoading: false })
    }
  }

  createUserHandler = () => {
    const {role, name, email, password} = this.state
    this.setState({ isLoading: true })

    this.services
      .signup({
        userType: role,
        name,
        email,
        password
      })
      .then(user => {
        console.log("user --> ", user)
        if (user.email) {
            this.props.history.push(DashboardRoutes.base + ProjectRoutes.base)
        }
        this.setState({ isLoading: false })
      })
      .catch(error => {
        let errorHelper = errorHandling(error)
        this.setState({
          currentErrorMessage: errorHelper.message,
          isLoading: false 
        })
        console.log("user --> ", error)
      })
  }


  render() {
    return (this.state.isLoading ?
      <div className="Container">
        <Loader
          type="Puff"
          color={styles.mainColor}
          height="100"
          width="100"
        />
      </div>
      :
      <div>
        <CreateUserForm
          onChange={this.onChange}
          name={this.state.name}
          role={this.state.role}
          email={this.state.email}
          password={this.state.password}
          createUser={this.createUserHandler}
          currentErrorMessage={this.state.currentErrorMessage}
        />
      </div>
    );
  }
}

export default CreateUser;