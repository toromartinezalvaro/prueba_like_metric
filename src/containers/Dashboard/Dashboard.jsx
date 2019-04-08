import React, { Component } from 'react';
import { Route } from "react-router-dom";
import { routes } from '../../routes/local/dashboard';
import DashboardLayout from '../../HOC/Layouts/Dashboard/Dashboard';
import Building from '../Building/Building';
import Areas from '../Area/Area';

class Dashboard extends Component {

  render() {
    const { match } = this.props;
    return (
      <DashboardLayout>
        <Route path={match.url + routes.building} exact component={Building} />
        <Route path={match.url + routes.area} exact component={Areas} />
      </DashboardLayout>
    );
  }
}

export default Dashboard;