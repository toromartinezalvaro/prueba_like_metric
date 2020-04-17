import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Step,
  Stepper,
  StepLabel,
  StepConnector,
  Card,
  CardContent,
} from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Group from '../../components/Groups/Groups';
import Items from '../../components/Groups/Items';
import StepIcon from '../../components/Groups/StepIcon';
import withDefaultLayout from '../../HOC/Layouts/Default/withDefaultLayout';

class Groups extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
      steps: ['Grupos', 'Items'],
    };
  }

  handleStep = (activeStep) => () => {
    this.setState({
      activeStep,
    });
  };

  stepsContent = (step) => {
    switch (step) {
      case 0:
        return <Group />;
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
    prop: PropTypes,
  };
}

export default withDefaultLayout(Groups);
