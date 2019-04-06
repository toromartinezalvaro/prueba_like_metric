import React, { Component } from 'react';
import { Route } from "react-router-dom";
import DashboardLayout from '../../HOC/Layouts/Dashboard/Dashboard';
import Building from '../Building/Building';

class Dashboard extends Component {

  render() {
    return (
      <DashboardLayout>
        <Route path="/dashboard/building" exact component={Building} />
      </DashboardLayout>
    );
  }
}

export default Dashboard;