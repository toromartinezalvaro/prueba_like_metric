import React, { Component } from 'react';
import Services from '../../services/UserServices'
import LoginComponent from '../../components/User/Login';

class Login extends Component {


  constructor(props) {
    super(props)
    this.services = new Services()
  }


  state = {
    email: "",
    password: "",
  }

  onChange = target => {
    const { name, value  } = target
    if (name && value) {
      this.setState({
          [name]: value
      })
    }
  }

  loginActionHandler = () => {
    this.services
    .login(this.state.email, this.state.password)
    .then(response => {
      console.log("response log ", response)
    })
  }


  render() {
    return (<div>
      <LoginComponent
        onChange={this.onChange}
        email={this.state.email}
        password={this.state.password}
        loginAction={this.loginActionHandler}
      />
    </div>
    );
  }
}

export default Login;