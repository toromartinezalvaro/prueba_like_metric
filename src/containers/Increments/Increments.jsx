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
    incrementsSummary: {
      market: { averagePrice: 0, anualEffectiveIncrement: 0 },
      groups: [],
      salesStartDate: new Date().getTime(),
      endOfSalesDate: new Date().getTime(),
    },
    increments: [],
    isLoading: false,
    isLoadingIncrements: false,
    isEmpty: false,
  };

  componentDidMount() {
    this.setState({ isLoading: true });
    this.services
      .getIncrementsSummary(this.props.match.params.towerId)
      .then((response) => {
        this.setState({ increments: response.data, isLoading: false });
      })
      .catch((error) => {
        this.setState({ isLoading: false });
        console.error(error);
      });
  }

  putSalesSpeed = (id, retentionMonths, index) => {
    this.services
      .putSalesSpeeds(id, { retentionMonths })
      .then((response) => {
        const tempGroups = [...this.state.increments];
        const group = tempGroups[index];
        group.total.ear = response.data;
        tempGroups[index] = group;
        this.setState({ increments: tempGroups });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  putSuggestedEffectiveAnnualInterestRate = (
    id,
    effectiveAnnualInterestRate,
  ) => {
    this.services.putSuggestedEffectiveAnnualInterestRate(id, {
      effectiveAnnualInterestRate,
    });
  };

  putIncrement = (id, increment, index) => {
    this.services
      .putIncrement(this.props.match.params.towerId, {
        groupId: id,
        increment,
      })
      .then((response) => {
        const tempGroups = [...this.state.increments];
        const group = tempGroups[index];
        group.total.ear = response.data;
        tempGroups[index] = group;
        this.setState({ increments: tempGroups });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  getPeriodsIncrements = () => {
    this.services
      .getPeriodsIncrements(this.props.match.params.towerId)
      .then((response) => {
        this.setState({ increments: response.data });
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
        const tempGroups = [...this.state.increments];
        const group = tempGroups[index];
        group.total.ear = response.data;
        tempGroups[index] = group;
        this.setState({ increments: tempGroups });
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
        {/* <IncrementsMarket
          putMarketAveragePrice={this.putMarketAveragePrice}
          putMarketAnnualEffectiveIncrement={
            this.putMarketAnnualEffectiveIncrement
          }
          marketData={this.state.incrementsSummary.market}
        />
        <IncrementsChart
          salesStartDate={this.state.incrementsSummary.salesStartDate}
          data={this.state.increments}
          getData={this.getPeriodsIncrements}
        /> */}
      </LoadableContainer>
    );
  }
}

export default Increments;
