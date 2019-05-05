import React, { Component } from "react";
import axios from "axios";
import Card, { CardHeader, CardBody } from "../../components/UI/Card/Card";
import Table from "../../components/UI/Table/Table";
import Input from "../../components/UI/Input/Input";

class Prime extends Component {
  state = {
    floorsPrices: [],
    floorsNames: [[]]
  };

  componentDidMount() {
    axios.get("http://localhost:1337/primes/").then(response => {
      const floorsPrices = [];
      const floorsNames = [];

      response.data.forEach(element => {
        floorsPrices.push([
          <Input
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
    console.log(`🦄 ${JSON.stringify(price)}`)
    axios
      .put(`http://localhost:1337/primes/${id}`, { price_mt2: parseInt(price) })
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
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
    );
  }
}

export default Prime;
