import React, { Component, Fragment } from 'react';
import IncrementsTable from '../../components/Increments/IncrementTable';
//import IncrementsChart from '../../components/Increments/IncrementsChart/IncrementsChart';
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
        this.setState({ incrementsSummary: response.data });
      })
      .catch(error => {
        console.error(error);
      });
  }

  putDefinitions = () => {
    // TODO: Cambiar nulos por ceros
    const salesSpeeds = this.state.incrementsSummary.map(increments => {
      return increments.salesSpeeds;
    });
    const anualEffectiveIncrements = this.state.incrementsSummary.map(
      increment => {
        return increment.anualEffectiveIncrements;
      },
    );
    this.services
      .putDefinitions(this.props.match.params.towerId, {
        salesSpeeds,
        anualEffectiveIncrements,
      })
      .then(results => {
        this.setState({ increments: results.data });
      })
      .catch(error => {
        console.error(error);
      });
  };

  getPrices = increments => {
    return increments.map(type => {
      return type.prices;
    });
  };

  render() {
    return (
      <Fragment>
        <IncrementsTable data={this.state.incrementsSummary} />
        {/* <IncrementsChart data={this.state.increments} /> */}
      </Fragment>
    );
  }
}

export default Increments;
