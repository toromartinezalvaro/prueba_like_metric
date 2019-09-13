import React, { Component } from 'react';
import TowerServices from '../../services/Towers/TowerServices';
import TowerItems from '../../components/Towers/Towers';
import Modal from '../../components/UI/Modal/Modal';
import Input from '../../components/UI/Input/Input';
import { DashboardRoutes } from '../../routes/local/routes';
import LoadableContainer from '../../components/UI/Loader';

export default class Towers extends Component {
  constructor(props) {
    super(props);
    this.services = new TowerServices(this);
  }

  state = {
    towers: [],
    modalIsHidden: true,
    newTitleTower: '',
    newDescriptionTower: '',
    alertMessage: '',
    alertIsHidden: true,
    isLoading: false,
    alertAccept: () => {},
  };

  componentDidMount() {
    this.loadCurrentTowers();
  }

  openTowerHandler = (tower) => {
    tower = { ...tower, projectId: this.props.match.params.projectId };
    this.props.changeTower(tower);
    this.props.history.push(
      DashboardRoutes.base + DashboardRoutes.building.value + tower.id,
    );
  };

  createTowerHandler = () => {
    this.setState({
      modalIsHidden: false,
    });
  };

  removetowerHandler = (id) => {
    const onAccept = () => {
      this.setState({
        alertIsHidden: true,
      });
      this.services
        .removeTower({
          projectId: this.props.match.params.projectId,
          towerId: id,
        })
        .then((response) => {
          let tower = response.data.towers;
          if (tower) {
            this.setState({
              towers: tower,
              modalIsHidden: tower.length > 0,
            });
          }
        })
        .catch((error) => {
          console.log('ERROR::: ', error);
        });
    };

    this.setState({
      alertAccept: onAccept,
      alertMessage:
        'Está seguro de que quiere eliminar toda la torre? Al hacer esto eliminará toda la info interna',
      alertIsHidden: false,
    });
  };

  loadCurrentTowers = () => {
    this.setState({ isLoading: true });
    this.services
      .getTowers(this.props.match.params.projectId)
      .then((response) => {
        console.log('response ---> ', response.data.towers);
        this.setState({
          towers: response.data.towers ? response.data.towers : [],
          modalIsHidden: response.data.towers.length > 0,
          isLoading: false,
        });
        console.log('state ---> ', this.state.towers);
      })
      .catch((error) => {
        this.setState({
          towers: [],
          modalIsHidden: true,
          isLoading: false,
        });
        console.log('ERROR::: ', error);
      });
  };

  onCreate = () => {
    if (this.state.newTitleTower === '') {
      alert('Ingrese por lo menos un nombre para poder crear una torre');
      return;
    }

    this.services
      .createTower({
        projectId: this.props.match.params.projectId,
        name: this.state.newTitleTower,
        description: this.state.newDescriptionTower,
      })
      .then((response) => {
        console.log('response ---> ', response.data);
        this.setState({
          towers: response.data.towers ? response.data.towers : [],
          modalIsHidden: response.data.towers.length > 0,
        });
      })
      .catch((error) => {
        console.log('ERROR::: ', error);
      });

    this.setState({
      modalIsHidden: true,
      newTitleTower: '',
      newDescriptionTower: '',
    });
  };

  cancel = () => {
    this.setState({
      alertIsHidden: true,
    });

    if (this.state.towers.length > 0) {
      this.setState({
        modalIsHidden: true,
      });
    } else {
      this.props.history.goBack();
    }
  };

  onChange = (target) => {
    this.setState({
      [target.name]: target.value,
    });
  };

  createModal = () => {
    return (
      <Modal
        title={'Crear Torre'}
        hidden={this.state.modalIsHidden}
        onConfirm={this.onCreate}
        onCancel={this.cancel}
      >
        <div>
          <label>Nombre</label>
          <Input
            name="newTitleTower"
            onChange={this.onChange}
            validations={[]}
            style={{ width: '75px' }}
            value={this.state.newTitleTower}
          />
        </div>
        <div>
          <label>Descripción</label>
          <Input
            name="newDescriptionTower"
            onChange={this.onChange}
            validations={[]}
            style={{ width: '75px' }}
            value={this.state.newDescriptionTower}
          />
        </div>
      </Modal>
    );
  };

  createAlert() {
    return (
      <Modal
        title={'Alerta!'}
        hidden={this.state.alertIsHidden}
        onConfirm={this.state.alertAccept}
        onCancel={this.cancel}
      >
        <p>{this.state.alertMessage}</p>
      </Modal>
    );
  }

  render() {
    return (
      <LoadableContainer isLoading={this.state.isLoading}>
        {this.state.towers.length > 0 && (
          <TowerItems
            towers={this.state.towers}
            openTower={this.openTowerHandler}
            createTower={this.createTowerHandler}
            removeTower={this.removetowerHandler}
          />
        )}
        {!this.state.modalIsHidden && this.createModal()}
        {!this.state.alertIsHidden && this.createAlert()}
      </LoadableContainer>
    );
  }
}
