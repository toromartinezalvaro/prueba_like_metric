import React, { Component } from 'react';
import moment from 'moment';
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
    averageDeliveryDate: new Date().getTime(),
    balancePointDate: new Date().getTime(),
    constructionStartDate: new Date().getTime(),
    firstSale: 0,
  };

  componentDidMount() {
    this.services
      .getDates(this.props.match.params.towerId)
      .then((response) => {
        let {
          salesStartDate,
          endOfSalesDate,
          averageDeliveryDate,
          balancePointDate,
          constructionStartDate,
        } = response.data;
        const { firstSale } = response.data;
        if (salesStartDate === null) {
          salesStartDate = new Date().getTime();
        }
        if (endOfSalesDate === null) {
          endOfSalesDate = new Date().getTime();
        }
        if (averageDeliveryDate === null) {
          averageDeliveryDate = new Date().getTime();
        }
        if (balancePointDate === null) {
          balancePointDate = new Date().getTime();
        }
        if (constructionStartDate === null) {
          constructionStartDate = new Date().getTime();
        }
        this.setState({
          salesStartDate,
          endOfSalesDate,
          firstSale,
          averageDeliveryDate,
          balancePointDate,
          constructionStartDate,
        });
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

  putBalancePointDate = (balancePointDate) => {
    this.services
      .putBalancePointDate(this.props.match.params.towerId, {
        balancePointDate,
      })
      .then((_) => {
        this.setState({ balancePointDate });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  putConstructionStartDate = (displacement) => {
    const { balancePointDate } = this.state;
    const constructionStartDate = moment(Number(balancePointDate))
      .add(displacement, 'M')
      .toDate()
      .getTime();
    this.services
      .putConstructionStartDate(this.props.match.params.towerId, {
        constructionStartDate,
      })
      .then((_) => {
        this.setState({ constructionStartDate });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  putAverageDeliveryDate = (displacement) => {
    const { balancePointDate } = this.state;
    const averageDeliveryDate = moment(Number(balancePointDate))
      .add(displacement, 'M')
      .toDate()
      .getTime();
    console.log(balancePointDate, averageDeliveryDate);
    this.services
      .putAverageDeliveryDate(this.props.match.params.towerId, {
        averageDeliveryDate,
      })
      .then((_) => {
        this.setState({ averageDeliveryDate });
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
          averageDeliveryDate={this.state.averageDeliveryDate}
          balancePointDate={this.state.balancePointDate}
          constructionStartDate={this.state.constructionStartDate}
          constructionStartDateHandler={this.putConstructionStartDate}
          salesStartDateHandler={this.putSalesStartDate}
          endOfSalesDateHandler={this.putEndOfSalesDate}
          averageDeliveryDateHandler={this.putAverageDeliveryDate}
          balancePointDateHandler={this.putBalancePointDate}
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
