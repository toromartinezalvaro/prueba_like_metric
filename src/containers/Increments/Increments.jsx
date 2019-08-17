import React, { Component } from 'react';
import IncrementsTable from '../../components/Increments/IncrementTable';
import IncrementsMarket from '../../components/Increments/IncrementsMarket/IncrementsMarket';
import IncrementsChart from '../../components/Increments/IncrementsChart/IncrementsChart';
import IncrementsServices from '../../services/increments/IncrementsServices';
import LoadableContainer from '../../components/UI/Loader';

class Increments extends Component {
  constructor(props) {
    super(props);
    this.services = new IncrementsServices(this);
  }

  state = {
    market: { averagePrice: 0, anualEffectiveIncrement: 0 },
    increments: [],
    graphData: [],
    isLoading: false,
    isLoadingIncrements: false,
    isEmpty: false,
  };

  componentDidMount() {
    this.setState({ isLoading: true });
    this.updateIncrements();
  }

  updateIncrements = () => {
    this.services
      .getIncrementsSummary(this.props.match.params.towerId)
      .then((response) => {
        this.setState({
          increments: response.data.increments,
          market: response.data.market,
          isLoading: false,
        });
      })
      .catch((error) => {
        this.setState({ isLoading: false });
        console.error(error);
      });
  };

  putSalesSpeed = (id, retentionMonths, index) => {
    this.services
      .putSalesSpeeds(id, { retentionMonths })
      .then((response) => {
        this.updateIncrements();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  putSuggestedEffectiveAnnualInterestRate = (
    id,
    effectiveAnnualInterestRate,
    index,
  ) => {
    this.services
      .putSuggestedEffectiveAnnualInterestRate(id, {
        effectiveAnnualInterestRate,
      })
      .then((response) => {
        this.updateIncrements();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  putIncrement = (id, increment, index) => {
    this.services
      .putIncrement(this.props.match.params.towerId, {
        groupId: id,
        increment,
      })
      .then((response) => {
        this.updateIncrements();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  getPeriodsIncrements = () => {
    this.services
      .getPeriodsIncrements(this.props.match.params.towerId)
      .then((response) => {
        this.setState({ graphData: response.data });
      });
  };

  putMarketAveragePrice = (averagePrice) => {
    this.services.putMarketAveragePrice(this.props.match.params.towerId, {
      averagePrice,
    });
  };

  putMarketAnnualEffectiveIncrement = (anualEffectiveIncrement) => {
    this.services.putMarketAnualEffectiveIncrement(
      this.props.match.params.towerId,
      {
        anualEffectiveIncrement,
      },
    );
  };

  putSuggestedSalesSpeed = (id, retentionMonths, index) => {
    this.services
      .putSuggestedSalesSpeeds(id, { retentionMonths })
      .then((response) => {
        this.updateIncrements();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  render() {
    return (
      <LoadableContainer isLoading={this.state.isLoading}>
        <IncrementsTable
          data={this.state.increments}
          putIncrement={this.putIncrement}
          putSalesSpeed={this.putSalesSpeed}
          putSuggestedSalesSpeed={this.putSuggestedSalesSpeed}
          putSuggestedEffectiveAnnualInterestRate={
            this.putSuggestedEffectiveAnnualInterestRate
          }
        />
        <IncrementsMarket
          putMarketAveragePrice={this.putMarketAveragePrice}
          putMarketAnnualEffectiveIncrement={
            this.putMarketAnnualEffectiveIncrement
          }
          marketData={this.state.market}
        />
        <IncrementsChart
          salesStartDate={new Date().getTime()}
          data={this.state.graphData}
          getData={this.getPeriodsIncrements}
        />
      </LoadableContainer>
    );
  }
}

export default Increments;
