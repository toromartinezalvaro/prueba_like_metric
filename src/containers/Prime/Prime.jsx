import React, { Component, Fragment } from 'react';
import _ from 'lodash';
import Input from '../../components/UI/Input/Input';
import Locations from '../../components/Primes/Locations';
import Altitudes from '../../components/Primes/Altitudes';
import PrimeServices from '../../services/prime/PrimeServices';
import FloatingButton from '../../components/UI/FloatingButton/FloatingButton';
import LoadableContainer from '../../components/UI/Loader';
import withDefaultLayout from '../../HOC/Layouts/Default/withDefaultLayout';

class Prime extends Component {
  constructor(props) {
    super(props);
    this.services = new PrimeServices(this);
  }

  state = {
    altitude: {
      unit: {},
      prices: [[]],
    },
    location: {
      unit: {},
      prices: [[]],
    },
    floorsNames: [],
    showFloatingButton: false,
    lowestFloor: 0,
    disabledProp: false,
  };

  componentDidMount() {
    this.setState({ isLoading: true });
    const towerId = this.props.match.params.towerId;
    if (!towerId) {
      return;
    }
    this.services
      .isDisable(this.props.match.params.towerId)
      .then((response) => {
        this.setState({ disabledProp: response.data });
      })
      .catch((err) => {
        console.log(err);
      });

    this.services.getAltitudePrimes(towerId).then((response) => {
      if (response.data.primes.length !== 0) {
        this.setState({
          lowestFloor: response.data.primes[0].tower.lowestFloor,
        });
      }

      const floorsNames = [];

      const altitude = { ...this.state.altitude };
      altitude.prices = response.data.primes;
      altitude.unit = response.data.unit;

      response.data.primes.forEach((element) => {
        floorsNames.push(element.reference);
      });
      let showFloating = response.data.primes.find((prime) => {
        return prime !== null && prime.price !== 0;
      });
      if (showFloating !== undefined) {
        this.setState({ showFloatingButton: true, isLoading: false });
      }
      this.setState({
        floorsNames: floorsNames,
        altitude: altitude,
        isLoading: false,
      });
    });
    this.getLocationPrimes();
  }

  getLocationPrimes = () => {
    this.setState({ isLoading: true });
    const towerId = this.props.match.params.towerId;
    this.services.getLocationPrimes(towerId).then((response) => {
      const location = { ...this.state.location };
      location.prices = response.data.primes;
      location.unit = response.data.unit;
      this.setState({ location: location });
      let showFloating = response.data.primes.find((arrayPrimes) => {
        let anyPrime = arrayPrimes.find((prime) => {
          return prime !== null && prime.price !== 0;
        });
        return anyPrime !== undefined;
      });
      if (showFloating !== undefined) {
        this.setState({ showFloatingButton: true, isLoading: false });
      }
    });
  };

  getInputs(type) {
    if (type === 'ALT') {
      const inputs = this.state.altitude.prices.map((prime) => [
        <Input
          mask="currency"
          style={{ width: '75px' }}
          validations={[]}
          zeroDefault={true}
          onChange={(target) => {
            this.priceHandler(
              'ALT',
              prime.id,
              parseInt(target.value >= 0 ? target.value : 0),
            );
          }}
          value={prime.price >= 0 ? prime.price : 0}
          disable={this.state.disabledProp}
        />,
      ]);
      return inputs;
    } else if (type === 'LCT') {
      const inputs = this.state.location.prices.map((primes) =>
        primes.map((prime) => {
          if (prime) {
            return (
              <Input
                mask="currency"
                style={{ width: '75px' }}
                value={prime.price >= 0 ? prime.price : 0}
                validations={[]}
                onChange={(target) => {
                  this.priceHandler(
                    'LCT',
                    prime.id,
                    target.value ? target.value : 0,
                  );
                }}
                placeholder={prime.name}
                tooltip={prime.name}
                disable={this.state.disabledProp}
              />
            );
          } else {
            return <Input style={{ width: '75px' }} placeholder="-" disable />;
          }
        }),
      );
      return inputs;
    }
  }

  priceHandler(type, id, price) {
    if (type === 'ALT') {
      this.services
        .putAltitudePrimesById(id, { price: parseInt(price) })
        .then((data) => {
          console.log(data);
          this.setState({ showFloatingButton: true });
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (type === 'LCT') {
      this.services
        .putLocationPrimesById(id, { price: parseInt(price) })
        .then((data) => {
          console.log(data);
          this.setState({ showFloatingButton: true });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  unitHandler = (type, value) => {
    if (type === 'ALT') {
      this.services
        .putAltitudePrimeUnit({
          towerId: this.props.match.params.towerId,
          unit: value,
        })
        .then((response) => {
          let altitude = { ...this.state.altitude };
          altitude.unit = response.data;
          this.setState({ altitude: altitude });
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (type === 'LCT') {
      this.services
        .putLocationPrimeUnit({
          towerId: this.props.match.params.towerId,
          unit: value,
        })
        .then((response) => {
          let location = { ...this.state.location };
          location.unit = response.data;
          this.setState({ location: location });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  render() {
    return (
      <LoadableContainer isLoading={this.state.isLoading}>
        <Altitudes
          unitHandler={this.unitHandler}
          unit={this.state.altitude.unit}
          floorsNames={this.state.floorsNames}
          prices={this.getInputs('ALT')}
        />
        <Locations
          unitHandler={this.unitHandler}
          headers={[
            ...Array(
              _.defaultTo(this.state.location.prices[0], []).length,
            ).keys(),
          ].map((o) => o + 1)}
          floorsNames={this.state.floorsNames}
          prices={this.getInputs('LCT')}
          unit={this.state.location.unit}
          towerId={this.props.match.params.towerId}
          reloadPrimes={this.getLocationPrimes}
          alertHandler={this.props.spawnMessage}
          lowestFloor={this.state.lowestFloor}
          disabledProp={this.state.disabledProp}
        />
        {this.state.showFloatingButton ? (
          <FloatingButton
            route="summary"
            projectId={this.props.match.params.projectId}
            towerId={this.props.match.params.towerId}
          >
            Resumen
          </FloatingButton>
        ) : null}
      </LoadableContainer>
    );
  }
}

export default withDefaultLayout(Prime);
