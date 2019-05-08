import React, { Component } from "react";
import { Route } from "react-router-dom";
import { DashboardRoutes } from "../../routes/local/routes";
import DashboardLayout from "../../HOC/Layouts/Dashboard/Dashboard";
import Building from "../Building/Building";
import Projects from "../Project/Projects"
import UserSettings from "../User/UserSettings";
import Areas from "../Area/Area";
import Prime from "../Prime/Prime";
import SecureContainer from "../Common/secureContainer";

class Dashboard extends Component {
  render() {
    const { match } = this.props;
    return (
      <DashboardLayout>
        <Route
          path={match.url + DashboardRoutes.projects}
          exact
          component={SecureContainer(Projects)}
        />
        <Route
          path={match.url + DashboardRoutes.building}
          exact
          component={SecureContainer(Building)}
        />
        <Route
          path={match.url + DashboardRoutes.areas}
          exact
          component={SecureContainer(Areas)}
        />
        <Route
          path={match.url + DashboardRoutes.user}
          exact
          component={SecureContainer(UserSettings)}
        />
        <Route
          path={match.url + DashboardRoutes.prime}
          exact
          component={Prime}
        />
      </DashboardLayout>
    );
  }
}

export default Dashboard;
