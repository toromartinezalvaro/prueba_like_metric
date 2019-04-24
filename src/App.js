import React, { Component } from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import { DashboardRoutes, UserRoutes } from './routes/local/routes';
import Dashboard from './containers/Dashboard/Dashboard';
import Login from './containers/User/Login';
import agent from './config/config'
import _ from './App.module.scss'
import PrivateRoute from './config/PrivateRoute'

class App extends Component {
  
  componentDidMount() {
    const token = agent.currentToken
    if (token) {
      agent.setToken(token);
    } 
  }


  render() {
    return (
      <BrowserRouter>
        <Route exact path={`(/|${UserRoutes.login})`} component={Login} />
        <PrivateRoute path={DashboardRoutes.base} component={Dashboard} />
      </BrowserRouter>
    );
  }
}

export default App;
