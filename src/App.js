import React, { Component } from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import { DashboardRoutes } from './routes/local/routes';
import Dashboard from './containers/Dashboard/Dashboard';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Route path={DashboardRoutes.base} component={Dashboard} />
      </BrowserRouter>
    );
  }
}

export default App;
