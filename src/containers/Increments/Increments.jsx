import React, { Component, Fragment } from 'react';
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
        // if (response.data.salesStartDate === null) {
        //   response.data.salesStartDate = new Date().getTime();
        // }
        // if (response.data.endOfSalesDate === null) {
        //   response.data.endOfSalesDate = new Date().getTime();
        // }
        // if (response.data.market === null) {
        //   response.data.market = {
        //     averagePrice: 0,
        //     anualEffectiveIncrement: 0,
        //   };
        // }
        // this.setState({
        //   incrementsSummary: response.data,
        //   isLoading: false,
        // });
      })
      .catch((error) => {
        this.setState({ isLoading: false });
        console.error(error);
      });
  }

  putSalesSpeed = (id, retentionMonths) => {
    // const salesSpeed = salesSpeed.replace(/,/g, '.');
    this.services.putSalesSpeeds(id, { retentionMonths });
  };

  anualEffectiveIncrementsHandler = (id, anualEffectiveIncrement) => {
    this.services.putAnualEffectiveIncrements(id, { anualEffectiveIncrement });
  };

  calcIncrements = () => {
    this.services
      .putIncrements(this.props.match.params.towerId)
      .then((results) => {
        this.setState({ increments: results.data });
      });
  };

  getIncrements = () => {
    this.setState({ isLoadingIncrements: true });
    this.services
      .getIncrements(this.props.match.params.towerId)
      .then((response) => {
        if (response.data.salesStartDate === null) {
          response.data.salesStartDate = new Date().getTime();
        }
        if (response.data.market === null) {
          response.data.market = {
            averagePrice: 0,
            anualEffectiveIncrement: 0,
          };
        }
        this.setState({
          incrementsSummary: response.data,
          isLoadingIncrements: false,
          isEmpty: false,
        });
      })
      .catch((err) =>
        this.setState({ isLoadingIncrements: false, isEmpty: true }),
      );
  };

  putIncrement = (id, increment) => {
    this.services
      .putIncrement(this.props.match.params.towerId, {
        groupId: id,
        increment,
      })
      .then((response) => {
        if (response.data.salesStartDate === null) {
          response.data.salesStartDate = new Date().getTime();
        }
        if (response.data.market === null) {
          response.data.market = {
            averagePrice: 0,
            anualEffectiveIncrement: 0,
          };
        }
        this.setState({ incrementsSummary: response.data });
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

  putSalesStartDate = (salesStartDate) => {
    this.services
      .putSalesStartDate(this.props.match.params.towerId, {
        salesStartDate,
      })
      .then((response) => {
        const tempIncrementsSummary = { ...this.state.incrementsSummary };
        tempIncrementsSummary.salesStartDate = salesStartDate;
        this.setState({ incrementsSummary: tempIncrementsSummary });
      });
  };

  putEndOfSalesDate = (endOfSalesDate) => {
    this.services
      .putEndOfSalesDate(this.props.match.params.towerId, {
        endOfSalesDate,
      })
      .then((response) => {
        const tempIncrementsSummary = { ...this.state.incrementsSummary };
        tempIncrementsSummary.endOfSalesDate = endOfSalesDate;
        this.setState({ incrementsSummary: tempIncrementsSummary });
      });
  };

  render() {
    return (
      <LoadableContainer isLoading={this.state.isLoading}>
        <IncrementsTable
          data={this.state.increments}
          putIncrement={this.putIncrement}
          putSalesSpeed={this.putSalesSpeed}
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
