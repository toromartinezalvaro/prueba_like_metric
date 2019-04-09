import React, { Component } from 'react';
import { Route } from "react-router-dom";
import LoginComponent from '../../components/User/Login';

class Login extends Component {

  state = {
    email: "",
    password: "",
  }

  onChange = event => {
    const { target: { name, value } } = event
    console.log("name  -->>", name, " v", value)
    if (name && value) {
      this.setState({
          [name]: value
      })
    }
  }




  render() {
    return (<div>
      <LoginComponent
        onChange={this.onChange}
        email={this.state.email}
        password={this.state.password}
      />
    </div>
    );
  }
}

export default Login;