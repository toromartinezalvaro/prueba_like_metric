import React, { Component } from 'react';
import SalesStartDate from '../../components/Schedule/SalesStartDate/SalesDateRange';
// import StageDates from '../../components/Schedule/StageDates/StageDates';
import InitialFees from '../../components/Schedule/InitialFees/InitialFees';
import ScheduleServices from '../../services/schedule/ScheduleServices';

class Schedule extends Component {
  constructor(props) {
    super(props);
    this.services = new ScheduleServices(this);
  }

  state = {
    salesStartDate: new Date().getTime(),
    endOfSalesDate: new Date().getTime(),
    firstSale: 0,
  };

  componentDidMount() {
    this.services
      .getDates(this.props.match.params.towerId)
      .then((response) => {
        let { salesStartDate, endOfSalesDate } = response.data;
        const { firstSale } = response.data;
        if (salesStartDate === null) {
          salesStartDate = new Date().getTime();
        }
        if (endOfSalesDate === null) {
          endOfSalesDate = new Date().getTime();
        }
        this.setState({ salesStartDate, endOfSalesDate, firstSale });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  putSalesStartDate = (salesStartDate) => {
    this.services
      .putSalesStartDate(this.props.match.params.towerId, { salesStartDate })
      .then((_) => {
        this.setState({ salesStartDate });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  putEndOfSalesDate = (endOfSalesDate) => {
    this.services
      .putEndOfSalesDate(this.props.match.params.towerId, { endOfSalesDate })
      .then((_) => {
        this.setState({ endOfSalesDate });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  firstSaleHandler = (firstSale) => {
    this.services
      .putFirstSaleHandler(this.props.match.params.towerId, { firstSale })
      .then((_) => {
        this.setState({ firstSale });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  render() {
    return (
      <div>
        <SalesStartDate
          salesStartDate={this.state.salesStartDate}
          endOfSalesDate={this.state.endOfSalesDate}
          salesStartDateHandler={this.putSalesStartDate}
          endOfSalesDateHandler={this.putEndOfSalesDate}
        />
        {/* <StageDates /> */}
        <InitialFees
          firstSale={this.state.firstSale}
          endOfSalesDate={this.state.endOfSalesDate}
          firstSaleHandler={this.firstSaleHandler}
        />
      </div>
    );
  }
}

export default Schedule;
