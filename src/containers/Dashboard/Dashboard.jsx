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
import { CreateUser, UserSettings, AssignTowerToUsers } from '../User';
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
import Client from '../Client/Client';
import FutureSalesSpeed from '../FutureSalesSpeed/FutureSalesSpeed';

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
        .then((response) => {
          this.setState({ tower: response.data });
        })
        .catch((error) => {
          console.log('ERROR >', error);
        });
    }
  }

  onChangeTower = (tower) => {
    if (
      tower === this.state.tower
      || (this.state.tower === null && tower === null)
    ) {
      return;
    }
    this.setState({
      tower,
    });
  };

  render() {
    const { match, location } = this.props;
    const {tower} = this.state;
    return (
      <DashboardLayout tower={tower} location={location}>
        <PrivateRoute
          path={match.url + ProjectRoutes.base}
          exact
          component={Projects}
          changeTower= {this.onChangeTower}
        />
        <PrivateRoute
          path={
            match.url
            + ProjectRoutes.base
            + DashboardRoutes.towers.withIndicator
          }
          exact
          component={Towers}
          changeTower= {this.onChangeTower}
        />
        <PrivateRoute
          path={match.url + DashboardRoutes.building.withIndicator}
          exact
          component={Building}
        />
        <PrivateRoute
          path={match.url + DashboardRoutes.areas.withIndicator}
          exact
          component={Areas}
        />
        <PrivateRoute
          path={match.url + DashboardRoutes.user}
          exact
          component={UserSettings}
          changeTower= {this.onChangeTower}
        />
        <PrivateRoute
          path={match.url + DashboardRoutes.prime.withIndicator}
          exact
          component={Prime}
        />
        <PrivateRoute
          path={match.url + DashboardRoutes.summary.withIndicator}
          exact
          component={Summary}
        />
        <PrivateRoute
          path={match.url + DashboardRoutes.detailAdmin.withIndicator}
          exact
          component={DetailAdmin}
        />
        <PrivateRoute
          path={match.url + DashboardRoutes.detail.withIndicator}
          exact
          component={Detail}
        />
        <PrivateRoute
          path={match.url + DashboardRoutes.rackAreas.withIndicator}
          exact
          component={RackAreas}
        />
        <PrivateRoute
          path={match.url + DashboardRoutes.clustering.withIndicator}
          exact
          component={Clustering}
        />
        <PrivateRoute
          path={match.url + DashboardRoutes.user + UserRoutes.create}
          roles={[Role.Admin, Role.Super]}
          exact
          component={CreateUser}
        />
        <PrivateRoute
          path={match.url + DashboardRoutes.user + UserRoutes.assignProjects}
          roles={[Role.Admin, Role.Super]}
          exact
          component={AssignTowerToUsers}
        />
        <PrivateRoute
          path={match.url + DashboardRoutes.strategy.withIndicator}
          exact
          component={Strategy}
        />
        <PrivateRoute
          path={match.url + DashboardRoutes.increments.withIndicator}
          roles={[Role.Admin, Role.Super]}
          exact
          component={Increments}
        />
        <PrivateRoute
          path={match.url + DashboardRoutes.salesRoom.withIndicator}
          exact
          component={SalesRoom}
        />
        <PrivateRoute
          path={match.url + DashboardRoutes.clients.withIndicator}
          roles={[Role.Admin, Role.Super]}
          exact
          component={Client}
        />
        <PrivateRoute
          path={match.url + DashboardRoutes.futureSalesSpeed.withIndicator}
          roles={[Role.Admin, Role.Super]}
          exact
          component={FutureSalesSpeed}
        />
      </DashboardLayout>
    );
  }
}

export default Dashboard;
