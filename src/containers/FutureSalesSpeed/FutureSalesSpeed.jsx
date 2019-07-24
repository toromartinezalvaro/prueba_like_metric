import React, { Component } from 'react';
import errorHandling from '../../services/commons/errorHelper';
import FutureSalesSpeedCard from '../../components/FutureSalesSpeed/FutureSalesSpeed';
import FutureSalesSpeedsServices from '../../services/futureSalesSpeeds/FutureSalesSpeedsServices';

class FutureSalesSpeed extends Component {
  constructor(props) {
    super(props);
    this.services = new FutureSalesSpeedsServices(this);
  }

  state = {
    salesSpeeds: [],
  };

  componentDidMount() {
    this.services
      .getFutureSalesSpeeds(this.props.match.params.towerId)
      .then(results => {
        this.setState({ salesSpeeds: results.data });
      })
      .catch(error => {
        let errorHelper = errorHandling(error);
        this.setState({
          currentErrorMessage: errorHelper.message,
        });
      });
  }

  futureSalesSpeedHandler = (id, value) => {
    this.services
      .putFutureSalesSpeeds(id, value)
      .then(results => {
        console.log(results);
      })
      .catch(error => {
        let errorHelper = errorHandling(error);
        this.setState({
          currentErrorMessage: errorHelper.message,
        });
      });
  };

  render() {
    return (
      <React.Fragment>
        {this.state.currentErrorMessage !== '' ? (
          <Error message={this.state.currentErrorMessage} />
        ) : null}
        <FutureSalesSpeedCard
          salesSpeeds={this.state.salesSpeeds}
          futureSalesSpeedHandler={this.futureSalesSpeedHandler}
        />
      </React.Fragment>
    );
  }
}

export default FutureSalesSpeed;
