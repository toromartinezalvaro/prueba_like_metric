import React, { Component } from 'react';
import SalesStartDate from '../../components/Schedule/SalesStartDate/SalesDateRange';
import StageDates from '../../components/Schedule/StageDates/StageDates';
import InitalFees from '../../components/Schedule/InitialFees/InitialFees';
import InitialFees from '../../components/Schedule/InitialFees/InitialFees';

class Schedule extends Component {
  constructor(props) {
    super(props);
    this.services = null;
  }

  state = {};

  componentDidMount() {
    this.setState({});
  }

  render() {
    return (
      <div>
        <SalesStartDate
        // salesStartDate={this.state.salesDates.salesStartDate}
        // endOfSalesDate={this.state.salesDates.endOfSalesDate}
        // salesStartDateHandler={this.putSalesStartDate}
        // endOfSalesDateHandler={this.putEndOfSalesDate}
        />
        <StageDates />
        <InitialFees />
      </div>
    );
  }
}

export default Schedule;
