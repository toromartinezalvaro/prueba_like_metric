import React, { Component } from 'react';
import { Route } from "react-router-dom";
import { DashboardRoutes } from '../../routes/local/routes';
import DashboardLayout from '../../HOC/Layouts/Dashboard/Dashboard';
import Building from '../Building/Building';
import UserSettings from '../User/UserSettings'
import Areas from '../Area/Area';

class Dashboard extends Component {

  render() {
    const { match } = this.props;
    return (
      <DashboardLayout>
        <Route path={match.url + DashboardRoutes.building} exact component={Building} />
        <Route path={match.url + DashboardRoutes.areas} exact component={Areas} />
        <Route path={match.url + DashboardRoutes.info} exact component={UserSettings} />
      </DashboardLayout>
    );
  }
}

export default Dashboard;