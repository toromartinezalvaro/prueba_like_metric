import React, { Component, Fragment } from 'react';
import SalesStartDate from '../../components/Increments/SalesStartDate/SalesStartDate';
import IncrementsTable from '../../components/Increments/IncrementTable';
import IncrementsMarket from '../../components/Increments/IncrementsMarket/IncrementsMarket';
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
        if (response.data.salesStartDate === null) {
          response.data.salesStartDate = new Date().getTime();
        }
        if (response.data.endOfSalesDate === null) {
          response.data.endOfSalesDate = new Date().getTime();
        }
        if (response.data.market === null) {
          response.data.market = {
            averagePrice: 0,
            anualEffectiveIncrement: 0,
          };
        }
        this.setState({
          incrementsSummary: response.data,
          isLoading: false,
        });
      })
      .catch((error) => {
        this.setState({ isLoading: false });
        console.error(error);
      });
  }

  salesSpeedsHandler = (id, salesSpeed) => {
    salesSpeed = salesSpeed.replace(/,/g, '.');
    this.services.putSalesSpeeds(id, { salesSpeed });
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
      <Fragment>
        <SalesStartDate
          salesStartDate={this.state.incrementsSummary.salesStartDate}
          endOfSalesDate={this.state.incrementsSummary.endOfSalesDate}
          dayChangeHandler={this.putSalesStartDate}
          endOfSalesDateHandler={this.putEndOfSalesDate}
        />
        <IncrementsTable
          getIncrements={this.getIncrements}
          data={this.state.incrementsSummary.groups}
          salesSpeedsHandler={this.salesSpeedsHandler}
          anualEffectiveIncrementsHandler={this.anualEffectiveIncrementsHandler}
          incrementsHandler={this.putIncrement}
          isLoadingIncrement={this.state.isLoadingIncrements}
          isEmpty={this.state.isEmpty}
        />
        <IncrementsMarket
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
        />
      </Fragment>
    );
  }
}

export default Increments;
