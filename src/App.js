import React, { Component } from 'react';
import { Router, Route } from "react-router-dom";
import Dashboard from './containers/Dashboard/Dashboard';
import Login from './containers/User/Login';
import agent from './config/config'
import history from './config/history'
import styles from './App.module.scss'

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
      <Router history={history}>
        <Route path="/login" component={Login} />
        <Route path="/dashboard" component={Dashboard} />
      </Router>
    );
  }
}

export default App;
