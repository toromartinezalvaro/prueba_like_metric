import React, { Component, Fragment } from 'react';
import IncrementsTable from '../../components/Increments/IncrementTable';
import IncrementsChart from '../../components/Increments/IncrementsChart/IncrementsChart';
import IncrementsServices from '../../services/increments/IncrementsServices';

class Increments extends Component {
  constructor(props) {
    super(props);
    this.services = new IncrementsServices(this);
  }

  state = {
    incrementsSummary: {
      market: { averagePrice: 0, anualEffectiveIncrement: 0 },
      groups: [],
    },
    increments: [],
  };

  componentDidMount() {
    this.services
      .getIncrementsSummary(this.props.match.params.towerId)
      .then(response => {
        if (response.data.market === null) {
          response.data.market = {
            averagePrice: 0,
            anualEffectiveIncrement: 0,
          };
        }
        this.setState({ incrementsSummary: response.data });
      })
      .catch(error => {
        console.error(error);
      });
  }

  salesSpeedsHandler = (id, salesSpeed) => {
    this.services.putSalesSpeeds(id, { salesSpeed });
  };

  anualEffectiveIncrementsHandler = (id, anualEffectiveIncrement) => {
    this.services.putAnualEffectiveIncrements(id, { anualEffectiveIncrement });
  };

  clacIncrements = () => {
    this.services
      .putIncrements(this.props.match.params.towerId)
      .then(results => {
        this.setState({ increments: results.data });
      });
  };

  getIncrements = () => {
    this.services
      .getIncrements(this.props.match.params.towerId)
      .then(response => {
        this.setState({ incrementsSummary: response.data });
      });
  };

  putIncrement = (id, increment) => {
    this.services
      .putIncrement(this.props.match.params.towerId, {
        groupId: id,
        increment,
      })
      .then(response => {
        this.setState({ incrementsSummary: response.data });
      });
  };

  getPeriodsIncrements = () => {
    this.services
      .getPeriodsIncrements(this.props.match.params.towerId)
      .then(response => {
        this.setState({ increments: response.data });
      });
  };

  putMarketAveragePrice = averagePrice => {
    this.services.putMarketAveragePrice(this.props.match.params.towerId, {
      averagePrice,
    });
  };
  putMarketAnualEffectiveIncrement = anualEffectiveIncrement => {
    this.services.putMarketAnualEffectiveIncrement(
      this.props.match.params.towerId,
      {
        anualEffectiveIncrement,
      },
    );
  };

  render() {
    return (
      <Fragment>
        <IncrementsTable
          putMarketAveragePrice={this.putMarketAveragePrice}
          putMarketAnualEffectiveIncrement={
            this.putMarketAnualEffectiveIncrement
          }
          getIncrements={this.getIncrements}
          data={this.state.incrementsSummary.groups}
          marketData={this.state.incrementsSummary.market}
          salesSpeedsHandler={this.salesSpeedsHandler}
          anualEffectiveIncrementsHandler={this.anualEffectiveIncrementsHandler}
          incrementsHandler={this.putIncrement}
        />
        <IncrementsChart
          data={this.state.increments}
          getData={this.getPeriodsIncrements}
        />
      </Fragment>
    );
  }
}

export default Increments;
