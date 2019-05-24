import React, { Component, Fragment } from "react";
import Input from "../../components/UI/Input/Input";
import Locations from "../../components/Primes/Locations";
import Altitudes from "../../components/Primes/Altitudes";
import PrimeServices from "../../services/prime/PrimeServices";

class Prime extends Component {
  constructor(props) {
    super(props);
    this.services = new PrimeServices(this);
  }

  state = {
    altitude: {
      unit: {},
      prices: [[]]
    },
    location: {
      unit: {},
      prices: [[]]
    },
    floorsNames: [[]]
  };

  componentDidMount() {
    this.services.getAltitudePrimes().then(response => {
      const floorsNames = [];

      const altitude = { ...this.state.altitude };
      altitude.prices = response.data.primes;
      altitude.unit = response.data.unit;

      response.data.primes.forEach(element => {
        floorsNames.push(element.reference);
      });

      this.setState({
        floorsNames: floorsNames,
        altitude: altitude
      });
    });

    this.services.getLocationPrimes().then(response => {
      const location = { ...this.state.location };
      location.prices = response.data.primes;
      location.unit = response.data.unit;
      this.setState({ location: location });
    });
  }

  getInputs(type) {
    if (type === "ALT") {
      const inputs = this.state.altitude.prices.map(prime => [
        <Input
          mask="currency"
          style={{ width: "75px", fontSize: "16px" }}
          validations={[]}
          onChange={target => {
            this.priceHandler("ALT", prime.id, parseInt(target.value));
          }}
          value={prime.price}
        />
      ]);
      return inputs;
    } else if (type === "LCT") {
      const inputs = this.state.location.prices.map(primes =>
        primes.map(prime => {
          if (prime) {
            return (
              <Input
                mask="currency"
                style={{ width: "75px", fontSize: "16px" }}
                value={prime.price}
                validations={[]}
                onChange={target => {
                  this.priceHandler("LCT", prime.id, target.value);
                }}
                placeholder={prime.name}
                tooltip={prime.name}
              />
            );
          } else {
            return (
              <Input
                style={{ width: "75px", fontSize: "16px" }}
                placeholder="-"
                disable
              />
            );
          }
        })
      );
      return inputs;
    }
  }

  priceHandler(type, id, price) {
    if (type === "ALT") {
      this.services
        .putAltitudePrimesById(id, { price: parseInt(price) })
        .then(data => {
          console.log(data);
        })
        .catch(error => {
          console.log(error);
        });
    } else if (type === "LCT") {
      this.services
        .putLocationPrimesById(id, { price: parseInt(price) })
        .then(data => {
          console.log(data);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  unitHandler = (type, value) => {
    if (type === "ALT") {
      this.services
        .putAltitudePrimeUnit({ towerId: "ff234f80-7b38-11e9-b198-3de9b761aac6", unit: value })
        .then(response => {
          let altitude = { ...this.state.altitude };
          altitude.unit = response.data;
          this.setState({ altitude: altitude });
        })
        .catch(error => {
          console.log(error);
        });
    } else if (type === "LCT") {
      this.services
        .putLocationPrimeUnit({ towerId: "ff234f80-7b38-11e9-b198-3de9b761aac6", unit: value })
        .then(response => {
          let location = { ...this.state.location };
          location.unit = response.data;
          this.setState({ location: location });
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  render() {
    return (
      <Fragment>
        <Altitudes
          unitHandler={this.unitHandler}
          unit={this.state.altitude.unit}
          floorsNames={this.state.floorsNames}
          prices={this.getInputs("ALT")}
        />
        <Locations
          unitHandler={this.unitHandler}
          headers={[...Array(this.state.location.prices[0].length).keys()].map(
            o => o + 1
          )}
          floorsNames={this.state.floorsNames}
          prices={this.getInputs("LCT")}
          unit={this.state.location.unit}
        />
      </Fragment>
    );
  }
}

export default Prime;
