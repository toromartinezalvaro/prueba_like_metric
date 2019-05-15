import React, { Component } from 'react';
import Services from '../../services/user/UserServices'
import LoginComponent from '../../components/User/Login';
import Loader from 'react-loader-spinner'
import agent from '../../config/config'
import { DashboardRoutes } from '../../routes/local/routes'
import styles from './Login.container.scss'
import errorHandling from '../../services/commons/errorHelper'

class Login extends Component {

  constructor(props) {
    super(props)
    this.services = new Services()
  }

  state = {
    email: "",
    password: "",
    currentErrorMessage: "",
    isLoading: false
  }

  componentDidMount() {
    this.loadCurrentUserInfo()
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
            this.props.history.push(DashboardRoutes.base)
          } else {
            agent.removeToken()
          }
          this.setState({ isLoading: false })
        })
        .catch(error => {
          agent.removeToken()
          this.setState({
            isLoading: false
          })
        })
    } else {
      this.setState({ isLoading: false })
    }
  }

  loginActionHandler = () => {
    this.setState({ isLoading: true })

    this.services
      .login(this.state.email, this.state.password)
      .then(user => {
        if (user.email) {
          this.props.history.push(DashboardRoutes.base)
        }
        this.setState({ isLoading: false })
      })
      .catch(error => {
        let errorHelper = errorHandling(error)
        this.setState({
          currentErrorMessage: errorHelper.message,
          isLoading: false 
        })
      })
  }


  render() {
    return (this.state.isLoading ?
      <div className="Container">
        <Loader
          type="Puff"
          color={styles.color}
          height="100"
          width="100"
        />
      </div>
      :
      <div>
        <LoginComponent
          onChange={this.onChange}
          email={this.state.email}
          password={this.state.password}
          loginAction={this.loginActionHandler}
          currentErrorMessage={this.state.currentErrorMessage}
        />
      </div>
    );
  }
}

export default Login;