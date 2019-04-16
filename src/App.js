import React, { Component } from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import Dashboard from './containers/Dashboard/Dashboard';
import Login from './containers/User/Login';
import User from './containers/User/User';
import agent from './config/config'
import history from './config/history'

class App extends Component {



  componentDidMount() {
    console.log("getSnapshotBeforeUpdate")
    const token = agent.currentToken
    if (token) {
      agent.setToken(token);
    }

    history.push("/login")
  }


  render() {
    return (
      <BrowserRouter>
        <Route path="/login" component={Login} />
        <Route path="/dashboard" component={Dashboard} />
      </BrowserRouter>
    );
  }
}

export default App;
