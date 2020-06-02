import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { SnackbarProvider } from 'notistack';
import { DashboardRoutes, UserRoutes } from './routes/local/routes';
import Dashboard from './containers/Dashboard/Dashboard';
import { Login } from './containers/User';
import './App.module.scss';
import CustomRoute from './config/PrivateRoute';
import store from './store';

class App extends Component {
  // eslint-disable-next-line class-methods-use-this
  render() {
    return (
      <Provider store={store}>
        <SnackbarProvider maxSnack={3}>
          <BrowserRouter>
            <CustomRoute
              exact
              path={`(/|${UserRoutes.login})`}
              component={Login}
              isPrivate={false}
            />
            <CustomRoute path={DashboardRoutes.base} component={Dashboard} />
          </BrowserRouter>
        </SnackbarProvider>
      </Provider>
    );
  }
}

export default App;
