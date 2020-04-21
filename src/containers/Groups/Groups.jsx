import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Step, Stepper, StepLabel, Card, CardContent } from '@material-ui/core';
import Group from '../../components/Groups/Groups';
import Items from '../../components/Groups/Items';
import Services from '../../services/group/groupService';
import StepIcon from '../../components/Groups/StepIcon';
import withDefaultLayout from '../../HOC/Layouts/Default/withDefaultLayout';

class Groups extends Component {
  constructor(props) {
    super(props);
    this.services = new Services();
    this.state = {
      activeStep: 0,
      steps: ['Grupos', 'Items'],
      groups: [],
    };
  }

  componentDidMount() {
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
  }

  handleStep = (activeStep) => () => {
    this.setState({
      activeStep,
    });
  };

  createOrUpdateGroup = (group) => {
    if (group.categoryName) {
      this.services
        .createGroup(group)
        .then(() => {
          this.props.spawnMessage('Cambio realizado con éxito', 'success');
        })
        .catch(() =>
          this.props.spawnMessage(
            'Ha ocurrido un error al hacer el cambio',
            'error',
          ),
        );
    } else {
      this.props.spawnMessage('Debe agregar un nombre al grupo', 'error');
    }
  };

  deleteGroup = (groupToDelete) => {
    console.log('PREPARE TO SEND', groupToDelete);
    this.services
      .deleteGroup(groupToDelete)
      .then(() => this.props.spawnMessage('Grupo borrado con exito', 'success'))
      .catch(() =>
        this.props.spawnMessage(
          'Ha ocurrido un error al editar el grupo',
          'error',
        ),
      );
  };

  stepsContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Group
            groups={this.state.groups}
            createOrUpdateGroup={this.createOrUpdateGroup}
            deleteGroup={this.deleteGroup}
          />
        );
      case 1:
        return <Items />;
      default:
        return 'NO DISPONIBLE';
    }
  };

  render() {
    return (
      <React.Fragment>
        <Stepper alternativeLabel nonLinear activeStep={this.state.activeStep}>
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
          <CardContent>{this.stepsContent(this.state.activeStep)}</CardContent>
        </Card>
      </React.Fragment>
    );
  }

  propTypes = {
    prop: PropTypes.func,
    spawnMessage: PropTypes.func,
  };
}

export default withDefaultLayout(Groups);
