import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import Step from '@material-ui/core/Step';
import Stepper from '@material-ui/core/Stepper';
import StepLabel from '@material-ui/core/StepLabel';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Group from '../../components/Groups/Groups';
import Items from '../../components/Groups/Items';
import Services from '../../services/group/groupService';
import StepIcon from '../../components/Groups/StepIcon';
import style from './Group.module.scss';
import withDefaultLayout from '../../HOC/Layouts/Default/withDefaultLayout';

class Groups extends Component {
  constructor(props) {
    super(props);
    this.services = new Services();
    this.state = {
      isLoaded: false,
      activeStep: 0,
      steps: ['Grupos', 'Items'],
      groups: [],
      items: [],
    };
  }

  getGroups = () => {
    this.services
      .getAllGroup()
      .then((response) => {
        const groups = response.data;
        this.setState({
          groups,
        });
      })
      .catch(() =>
        this.props.spawnMessage('Error al conectar con el servicio', 'error'),
      );
  };

  getItems = () => {
    this.services
      .getAllItems()
      .then((response) => {
        const items = response.data;
        this.setState({
          items,
          isLoaded: true,
        });
      })
      .catch(() =>
        this.props.spawnMessage('Error al conectar con el servicio', 'error'),
      );
  };

  componentDidMount() {
    this.getGroups();
    this.getItems();
  }

  handleStep = (activeStep) => () => {
    this.setState({
      activeStep,
    });
  };

  createOrUpdateGroup = (group) => {
    if (group.categoryName && group.categoryName !== '' && group.index) {
      const groups = [...this.state.groups];
      groups[group.index] = group;
      this.setState({ groups });
    } else if (group.categoryName && group.categoryName !== '' && group.id) {
      const groups = [...this.state.groups];
      const index = groups.findIndex((list) => list.id === group.id);
      groups[index] = group;
      this.setState({ groups });
    } else {
      this.props.spawnMessage('Debe agregar un nombre al grupo', 'error');
    }
  };

  deleteGroup = (groupToDelete) => {
    this.setState((prevState) => ({
      groups: prevState.groups.filter((list) => list.id !== groupToDelete),
    }));
  };

  createOrUpdateItem = (item) => {
    const checkRepeat = this.state.items.find(
      (element) => element.PUC === item.PUC || element.name === item.name,
    );
    if (checkRepeat) {
      this.props.spawnMessage('Este item ya existe', 'error');
    } else {
      this.services
        .createItem(item)
        .then((response) => {
          if (response.data.error) {
            this.props.spawnMessage(response.data.error, 'error');
          } else {
            this.props.spawnMessage('Cambio realizado con éxito', 'success');
            this.setState({ items: [...this.state.items, response.data] });
          }
        })
        .catch(() =>
          this.props.spawnMessage(
            'Ha ocurrido un error al hacer el cambio',
            'error',
          ),
        );
    }
  };

  deleteItem = (item) => {
    this.services
      .deleteItem(item)
      .then(() => {
        this.props.spawnMessage('Item borrado con exito', 'success');
        this.getItems();
      })
      .catch(() =>
        this.props.spawnMessage(
          'Ha ocurrido un error al borrar el item',
          'error',
        ),
      );
  };

  generateFieldGroup = () => {
    const group = { categoryName: null, index: this.state.groups.length };
    this.setState((prevState) => ({
      groups: [...prevState.groups, group],
    }));
  };

  stepsContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Group
            groups={this.state.groups}
            createOrUpdateGroup={this.createOrUpdateGroup}
            deleteGroup={this.deleteGroup}
            generateFieldGroup={this.generateFieldGroup}
          />
        );
      case 1:
        return (
          <Items
            groups={this.state.groups}
            items={this.state.items}
            createOrUpdateItem={this.createOrUpdateItem}
            deleteItem={this.deleteItem}
          />
        );
      default:
        return 'NO DISPONIBLE';
    }
  };

  render() {
    return (
      <>
        {this.state.isLoaded ? (
          <>
            <Stepper
              alternativeLabel
              nonLinear
              activeStep={this.state.activeStep}
            >
              {this.state.steps.map((label, index) => (
                <Step key={label}>
                  <StepLabel
                    onClick={this.handleStep(index)}
                    StepIconComponent={StepIcon}
                  >
                    {label}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
            <Card>
              <CardContent>
                {this.stepsContent(this.state.activeStep)}
              </CardContent>
            </Card>
          </>
        ) : (
          <div className={style.loader}>
            <CircularProgress />
          </div>
        )}
      </>
    );
  }

  propTypes = {
    prop: PropTypes.func,
    spawnMessage: PropTypes.func,
  };
}

export default withDefaultLayout(Groups);
