import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import {
  DashboardRoutes,
  ProjectRoutes,
  UserRoutes,
} from '../../routes/local/routes';
import DashboardLayout from '../../HOC/Layouts/Dashboard/Dashboard';
import Building from '../Building/Building';
import Projects from '../Project/Projects';
import Towers from '../Towers/Towers';
// import {CreateUser} from "../User";
import { CreateUser, UserSettings } from '../User';
// import UserSettings from "../User";
import Areas from '../Area/Area';
import Prime from '../Prime/Prime';
import DetailAdmin from '../DetailAdmin/DetailAdmin';
import Detail from '../Detail/Detail';
import RackAreas from '../RackAreas/RackAreas';
import SecureContainer from '../../HOC/Common/SecureContainer';
import TowerServices from '../../services/Towers/TowerServices';
import Summary from '../Summary/Summary';
import Clustering from '../Clustering/Clustering';
import Increments from '../Increments/Increments';
import PrivateRoute from '../../config/PrivateRoute';
import { Role } from '../../helpers';
import Strategy from '../Strategy/Strategy';
import SalesRoom from '../SalesRoom/SalesRoom';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.services = new TowerServices(this);
  }

  state = {
    tower: null,
  };

  componentDidMount() {
    const towerId = this.props.location.pathname.split('/')[3];

    if (towerId && this.state.tower === null) {
      this.services
        .getTower(towerId)
        .then(response => {
          this.setState({ tower: response.data });
        })
        .catch(error => {
          console.log('ERROR >', error);
        });
    }
  }

  onChangeTower = tower => {
    if (
      tower === this.state.tower ||
      (this.state.tower === null && tower === null)
    ) {
      return;
    }
    this.setState({
      tower: tower,
    });
  };

  render() {
    const { match, location } = this.props;
    const tower = this.state.tower;
    return (
      <DashboardLayout tower={tower} location={location}>
        <Route
          path={match.url + ProjectRoutes.base}
          exact
          component={SecureContainer(Projects, {
            changeTower: this.onChangeTower,
          })}
        />
        <Route
          path={
            match.url +
            ProjectRoutes.base +
            DashboardRoutes.towers.withIndicator
          }
          exact
          component={SecureContainer(Towers, {
            changeTower: this.onChangeTower,
          })}
        />
        <Route
          path={match.url + DashboardRoutes.building.withIndicator}
          exact
          component={SecureContainer(Building)}
        />
        <Route
          path={match.url + DashboardRoutes.areas.withIndicator}
          exact
          component={SecureContainer(Areas)}
        />
        <Route
          path={match.url + DashboardRoutes.user}
          exact
          component={SecureContainer(UserSettings, {
            changeTower: this.onChangeTower,
          })}
        />
        <Route
          path={match.url + DashboardRoutes.prime.withIndicator}
          exact
          component={SecureContainer(Prime)}
        />
        <Route
          path={match.url + DashboardRoutes.summary.withIndicator}
          exact
          component={SecureContainer(Summary)}
        />
        <Route
          path={match.url + DashboardRoutes.detailAdmin.withIndicator}
          exact
          component={SecureContainer(DetailAdmin)}
        />
        <Route
          path={match.url + DashboardRoutes.detail.withIndicator}
          exact
          component={SecureContainer(Detail)}
        />
        <Route
          path={match.url + DashboardRoutes.rackAreas.withIndicator}
          exact
          component={SecureContainer(RackAreas)}
        />
        <Route
          path={match.url + DashboardRoutes.clustering.withIndicator}
          exact
          component={SecureContainer(Clustering)}
        />
        <PrivateRoute
          path={match.url + DashboardRoutes.user + UserRoutes.create}
          roles={[Role.Admin, Role.Super]}
          exact
          component={CreateUser}
        />
        <Route
          path={match.url + DashboardRoutes.strategy.withIndicator}
          exact
          component={SecureContainer(Strategy)}
        />
        <PrivateRoute
          path={match.url + DashboardRoutes.increments.withIndicator}
          roles={[Role.Admin, Role.Super]}
          exact
          component={SecureContainer(Increments)}
        />
        <PrivateRoute
          path={match.url + DashboardRoutes.salesRoom.withIndicator}
          exact
          component={SecureContainer(SalesRoom)}
        />
      </DashboardLayout>
    );
  }
}

export default Dashboard;
