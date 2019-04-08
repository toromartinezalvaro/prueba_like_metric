import React, { Component } from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import Dashboard from './containers/Dashboard/Dashboard';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Route path="/dashboard" component={Dashboard} />
      </BrowserRouter>
    );
  }
}

export default App;
