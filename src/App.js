import React, { Component } from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import {routes} from './routes/local/dashboard';
import Dashboard from './containers/Dashboard/Dashboard';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Route path={routes.base} component={Dashboard} />
      </BrowserRouter>
    );
  }
}

export default App;
