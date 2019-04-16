import React, { Component } from 'react';
import { Route } from "react-router-dom";
import DashboardLayout from '../../HOC/Layouts/Dashboard/Dashboard';
import Building from '../Building/Building';
import UserSettings from '../User/UserSettings'

class Dashboard extends Component {

  render() {
    return (
      <DashboardLayout>
        <Route path="/dashboard/building" exact component={Building} />
        <Route path="/dashboard/info" exact component={UserSettings} />
      </DashboardLayout>
    );
  }
}

export default Dashboard;