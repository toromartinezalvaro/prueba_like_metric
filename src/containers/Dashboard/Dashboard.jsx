import React, { Component } from 'react';
import { Route } from "react-router-dom";
import { DashboardRoutes } from '../../routes/local/routes';
import DashboardLayout from '../../HOC/Layouts/Dashboard/Dashboard';
import Building from '../Building/Building';
import UserSettings from '../User/UserSettings'
import Areas from '../Area/Area';
import SecureContainer from '../Common/secureContainer'

class Dashboard extends Component {

  render() {
    const { match } = this.props;
    return (
      <DashboardLayout>
        <Route path={match.url + DashboardRoutes.building} exact component={SecureContainer(Building)} />
        <Route path={match.url + DashboardRoutes.areas} exact component={Areas} />
        <Route path={match.url + DashboardRoutes.user} exact component={UserSettings} />
      </DashboardLayout>
    );
  }
}

export default Dashboard;