import React, { Component } from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import { DashboardRoutes } from './routes/local/routes';
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
      <BrowserRouter>
            <Route path={UserRoutes.login} component={Login} />
        <Route path={DashboardRoutes.base} component={Dashboard} />
      </BrowserRouter>
    );
  }
}

export default App;
