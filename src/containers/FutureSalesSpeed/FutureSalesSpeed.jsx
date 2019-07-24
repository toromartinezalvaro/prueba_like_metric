import React, { Component } from 'react';
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
      });
  }

  futureSalesSpeedHandler = (id, value) => {
    this.services.putFutureSalesSpeeds(id, value).then(results => {
      console.log(results);
    });
  };

  render() {
    return (
      <FutureSalesSpeedCard
        salesSpeeds={this.state.salesSpeeds}
        futureSalesSpeedHandler={this.futureSalesSpeedHandler}
      />
    );
  }
}

export default FutureSalesSpeed;
