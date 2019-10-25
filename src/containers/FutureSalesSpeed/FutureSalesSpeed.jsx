import _ from 'lodash';
import React, { Component } from 'react';
import Error from '../../components/UI/Error/Error';
import errorHandling from '../../services/commons/errorHelper';
import FutureSalesSpeedCard from '../../components/FutureSalesSpeed/FutureSalesSpeed';
import FutureSalesSpeedsServices from '../../services/futureSalesSpeeds/FutureSalesSpeedsServices';
import LoadableContainer from '../../components/UI/Loader';

class FutureSalesSpeed extends Component {
  constructor(props) {
    super(props);
    this.services = new FutureSalesSpeedsServices(this);
  }

  state = {
    salesSpeeds: [],
    currentErrorMessage: '',
    isLoading: false,
  };

  componentDidMount() {
    this.setState({ isLoading: true });
    this.services
      .getFutureSalesSpeeds(this.props.match.params.towerId)
      .then((results) =>
        this.setState({ salesSpeeds: results.data, isLoading: false }),
      )
      .catch((error) => {
        const errorHelper = errorHandling(error);
        this.setState({
          currentErrorMessage: errorHelper.message,
          isLoading: false,
        });
      });
  }

  futureSalesSpeedHandler = (id, value) => {
    this.services
      .putFutureSalesSpeeds(id, value)
      .then((results) => console.log(results))
      .catch((error) => {
        const errorHelper = errorHandling(error);
        this.setState({
          currentErrorMessage: errorHelper.message,
        });
      });
  };

  separationHandler = (id, value, rollback) => {
    this.services
      .putSeparation(id, value)
      .then((results) => {
        if (!results.data) {
          rollback(true);
        } else {
          rollback(false);
        }
      })
      .catch((error) => {
        const errorHelper = errorHandling(error);
        this.setState({
          currentErrorMessage: errorHelper.message,
        });
      });
  };

  initialFeeHandler = (id, value, rollback) => {
    this.services
      .putInitialFee(id, value)
      .then((results) => {
        if (!results.data) {
          rollback(true);
        } else {
          rollback(false);
        }
      })
      .catch((error) => {
        const errorHelper = errorHandling(error);
        this.setState({
          currentErrorMessage: errorHelper.message,
        });
        rollback(true);
      });
  };

  render() {
    return (
      <LoadableContainer isLoading={this.state.isLoading}>
        {this.state.currentErrorMessage !== '' ? (
          <Error message={this.state.currentErrorMessage} />
        ) : null}
        <FutureSalesSpeedCard
          salesSpeeds={this.state.salesSpeeds}
          futureSalesSpeedHandler={this.futureSalesSpeedHandler}
          separationHandler={this.separationHandler}
          initialFeeHandler={this.initialFeeHandler}
        />
      </LoadableContainer>
    );
  }
}

export default FutureSalesSpeed;
