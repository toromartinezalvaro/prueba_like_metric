import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { DashboardRoutes, UserRoutes } from './routes/local/routes';
import Dashboard from './containers/Dashboard/Dashboard';
import { Login } from './containers/User';
import agent from './config/config';
import _ from './App.module.scss';
import CustomRoute from './config/PrivateRoute';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <CustomRoute
          exact
          path={`(/|${UserRoutes.login})`}
          component={Login}
          isPrivate={false}
        />
        <CustomRoute path={DashboardRoutes.base} component={Dashboard} />
      </BrowserRouter>
    );
  }
}

export default App;
