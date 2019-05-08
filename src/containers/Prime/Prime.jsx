import React, { Component, Fragment } from "react";
import axios from "axios";
import Card, { CardHeader, CardBody } from "../../components/UI/Card/Card";
import Table from "../../components/UI/Table/Table";
import Input from "../../components/UI/Input/Input";
import Locations from "../../components/Primes/Locations";
import PrimeServices from "../../services/prime/PrimeServices";

class Prime extends Component {
  constructor(props) {
    super(props);
    this.services = new PrimeServices(this);
  }
  state = {
    floorsPrices: [],
    floorsNames: [[]]
  };

  componentDidMount() {
    this.services.getPrimes().then(response => {
      const floorsPrices = [];
      const floorsNames = [];

      response.data.forEach(element => {
        floorsPrices.push([
          <Input
            mask="currency"
            style={{ width: "75px", fontSize: "16px" }}
            validations={[]}
            onChange={target => {
              this.priceHandler(element.id, parseInt(target.value));
            }}
            value={element.price_mt2}
          />
        ]);
        floorsNames.push(element.reference);
      });

      this.setState({ floorsPrices: floorsPrices, floorsNames: floorsNames });
    });
  }

  priceHandler(id, price) {
    this.services
      .putPrimesById(id, { price_mt2: parseInt(price) })
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <Fragment>
        <Card>
          <CardHeader>
            <p>Primas por altura</p>
          </CardHeader>
          <CardBody>
            <Table
              intersect="primas"
              headers={["Precio mt2"]}
              columns={this.state.floorsNames}
              data={this.state.floorsPrices}
            />
          </CardBody>
        </Card>
        <Locations />
      </Fragment>
    );
  }
}

export default Prime;
