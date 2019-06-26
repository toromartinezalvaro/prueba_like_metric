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
    incrementsSummary: [],
    increments: [],
  };

  componentDidMount() {
    this.services
      .getIncrementsSummary(this.props.match.params.towerId)
      .then(response => {
        const notNulls = response.data.reduce((current, next) => {
          return current &&
            next.salesSpeed !== null &&
            next.anualEffectiveIncrement !== null;
        }, true);
        if (notNulls) {
          this.getIncrements();
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
      .then(results => {
        this.setState({ increments: results.data });
      });
  };

  putIncrement = (id, increment) => {
    this.services.putIncrement(id, { increment });
  };

  render() {
    return (
      <Fragment>
        <IncrementsTable
          calcIncrements={this.clacIncrements}
          getIncrements={this.getIncrements}
          data={this.state.incrementsSummary}
          salesSpeedsHandler={this.salesSpeedsHandler}
          anualEffectiveIncrementsHandler={this.anualEffectiveIncrementsHandler}
        />
        {this.state.increments.length === 0 ? null : (
          <IncrementsChart
            data={this.state.increments}
            incrementsHandler={this.putIncrement}
          />
        )}
      </Fragment>
    );
  }
}

export default Increments;
