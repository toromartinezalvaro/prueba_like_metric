import React, { Component } from "react";
import { Route } from "react-router-dom";
import { DashboardRoutes, ProjectRoutes } from "../../routes/local/routes";
import DashboardLayout from "../../HOC/Layouts/Dashboard/Dashboard";
import Building from "../Building/Building";
import Projects from "../Project/Projects";
import Towers from "../Towers/Towers";
import UserSettings from "../User/UserSettings";
import Areas from "../Area/Area";
import Prime from "../Prime/Prime";
import SecureContainer from "../../HOC/Common/SecureContainer";

class Dashboard extends Component {
  
  state = {
    tower: null
  }

  onChangeTower = tower => {
    this.setState({
      tower: tower
    })
  }


  render() {
    const { match } = this.props;
    console.log("match -------> ", match.params.towerId, " ", this.state.tower)
    const tower =  this.state.tower
    return (
      <DashboardLayout tower={ tower }>
        <Route
          path={match.url + ProjectRoutes.base }
          exact
          component={SecureContainer(Projects)}
        />
        <Route
          path={match.url + ProjectRoutes.base + DashboardRoutes.towersProjectId}
          exact
          component={SecureContainer(Towers, { changeTower: this.onChangeTower })}
        />
        <Route
          path={match.url + DashboardRoutes.building.withIndicator}
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
